import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';


@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  public dbInstance!: SQLiteObject;

  constructor(private sqlite: SQLite) {
    this.createDatabase();
    
  }

  async createDatabase() {
    try {
      this.dbInstance = await this.sqlite.create({
        name: 'mydb.db',
        location: 'default'
      });
      await this.createTables();
      await this.seedRegions();
    } catch (error) {
      console.error('Error creating database:', error);
    }
  }

async createTables() {
  await this.dbInstance.executeSql(
    `CREATE TABLE IF NOT EXISTS region (
      id_region INTEGER PRIMARY KEY,
      region_name TEXT NOT NULL
    )`,
    []
  );

  await this.dbInstance.executeSql(
    `CREATE TABLE IF NOT EXISTS users (
      email TEXT PRIMARY KEY,
      password TEXT NOT NULL,
      fullname TEXT NOT NULL,
      region_id INTEGER NOT NULL,
      reputation INTEGER DEFAULT 0,
      FOREIGN KEY(region_id) REFERENCES region(id_region)
    )`,
    []
  );

  await this.dbInstance.executeSql(
    `CREATE TABLE IF NOT EXISTS offer (
      num_offer INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      date TEXT NOT NULL,
      direction TEXT NOT NULL,
      price REAL NOT NULL,
      rank INTEGER DEFAULT 0,
      image TEXT,
      name_creator TEXT NOT NULL,
      email_creator TEXT NOT NULL,
      FOREIGN KEY(email_creator) REFERENCES users(email)
    )`,
  []
  );

  
}
  async seedRegions() {
  const regions = [
    { id: 1, name: 'Arica y Parinacota' },
    { id: 2, name: 'Tarapacá' },
    { id: 3, name: 'Antofagasta' },
    { id: 4, name: 'Atacama' },
    { id: 5, name: 'Coquimbo' },
    { id: 6, name: 'Valparaíso' },
    { id: 7, name: 'Metropolitana' },
    { id: 8, name: 'Libertador B. O’Higgins' },
    { id: 9, name: 'Maule' },
    { id: 10, name: 'Ñuble' },
    { id: 11, name: 'Biobío' },
    { id: 12, name: 'La Araucanía' },
    { id: 13, name: 'Los Ríos' },
    { id: 14, name: 'Los Lagos' },
    { id: 15, name: 'Aysén' },
    { id: 16, name: 'Magallanes' }
  ];

  for (const region of regions) {
    await this.dbInstance.executeSql(
      `INSERT OR IGNORE INTO region (id_region, region_name) VALUES (?, ?)`,
      [region.id, region.name]
    );
  } 
}

async register(email: string, password: string, fullname: string, region_id: number): Promise<boolean> {
  try {
    await this.dbInstance.executeSql(
      `INSERT INTO users (email, password, fullname, region_id) VALUES (?, ?, ?, ?)`,
      [email, password, fullname, region_id]
    );
    return true;
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    return false;
  }
}

async login(email: string, password: string): Promise<any | null> {
  try {
    const res = await this.dbInstance.executeSql(
      `SELECT * FROM users WHERE email = ? AND password = ?`,
      [email, password]
    );

    if (res.rows.length > 0) {
      return res.rows.item(0);
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    return null;
  }
}

async addOffer(
  title: string,
  description: string,
  date: string,
  direction: string,
  price: number,
  email_creator: string,
  image: string
): Promise<boolean> {
  try {
    const res = await this.dbInstance.executeSql(
      `SELECT fullname FROM users WHERE email = ?`,
      [email_creator]
    );

    if (res.rows.length === 0) {
      throw new Error('Usuario no encontrado');
    }

    const name_creator = res.rows.item(0).fullname;

    await this.dbInstance.executeSql(
      `INSERT INTO offer (title, description, date, direction, price, rank, name_creator, email_creator, image)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, description, date, direction, price, 0, name_creator, email_creator, image]
    );

    return true;
  } catch (error) {
    console.error('Error al agregar oferta:', error);
    return false;
  }
}

//Todo lo relacionado al usuario actual
private currentUser: any = null;

setCurrentUser(user: any) {
  this.currentUser = user;
}

getCurrentUser(): any {
  return this.currentUser;
}

clearCurrentUser() {
  this.currentUser = null;
}



async getAllOffers(): Promise<any[]> {
  try {
    const res = await this.dbInstance.executeSql(`SELECT * FROM offer`, []);
    const offers = [];
    for (let i = 0; i < res.rows.length; i++) {
      offers.push(res.rows.item(i));
    }
    return offers;
  } catch (error) {
    console.error('Error al obtener ofertas:', error);
    return [];
  }
}

async getOffersByUser(email: string): Promise<any[]> {
  try {
    const res = await this.dbInstance.executeSql(
      `SELECT * FROM offer WHERE email_creator = ?`,
      [email]
    );
    const offers: any[] = [];
    for (let i = 0; i < res.rows.length; i++) {
      offers.push(res.rows.item(i));
    }
    return offers;
  } catch (error) {
    console.error('Error al obtener ofertas del usuario:', error);
    return [];
  }
}

async deleteOffer(num_offer: number): Promise<boolean> {
  try {
    await this.dbInstance.executeSql(
      `DELETE FROM offer WHERE num_offer = ?`,
      [num_offer]
    );
    return true;
  } catch (error) {
    console.error('Error al eliminar oferta:', error);
    return false;
  }
}

}
