import { DBConfig } from 'ngx-indexed-db';

export const dbConfig: DBConfig = {
  name: 'MoyoCR',
  version: 1,
  objectStoresMeta: [
    {
      store: 'ls_Cia',
      storeConfig: { keyPath: 'Cia_Id', autoIncrement: false },
      storeSchema: [
        { name: 'Cia_Id', keypath: 'Cia_Id', options: { unique: false } },
        { name: 'Cia_Suc', keypath: 'Cia_Suc', options: { unique: false } },
        { name: 'Cia_Nom', keypath: 'Cia_Nom', options: { unique: false } },
        { name: 'Cia_RaSo', keypath: 'Cia_RaSo', options: { unique: false } },
        { name: 'Cia_Dir1', keypath: 'Cia_Dir1', options: { unique: false } },
        { name: 'Cia_Dir2', keypath: 'Cia_Dir2', options: { unique: false } },
        { name: 'Cia_Dir3', keypath: 'Cia_Dir3', options: { unique: false } },
        { name: 'Cia_Pcia', keypath: 'Cia_Pcia', options: { unique: false } },
        { name: 'Cia_Cton', keypath: 'Cia_Cton', options: { unique: false } },
        { name: 'Cia_Dtto', keypath: 'Cia_Dtto', options: { unique: false } },
        { name: 'Cia_Barr', keypath: 'Cia_Barr', options: { unique: false } },
        { name: 'Cia_Tel', keypath: 'Cia_Tel', options: { unique: false } },
        { name: 'Cia_EMa', keypath: 'Cia_EMa', options: { unique: false } },
        { name: 'Cia_RFC', keypath: 'Cia_RFC', options: { unique: false } },
        { name: 'Cia_RegPat', keypath: 'Cia_RegPat', options: { unique: false } },
        { name: 'Cia_Tablet', keypath: 'Cia_Tablet', options: { unique: false } },
        { name: 'Cia_PIN', keypath: 'Cia_Pin', options: { unique: false } },
        { name: 'id_fiscal', keypath: 'id_fiscal', options: { unique: false } },
        { name: 'estado', keypath: 'estado', options: { unique: false } }

      ],
    },
    {
      store: 'ls_Cupdes',
      storeConfig: { keyPath: 'CupDes_Id', autoIncrement: false },
      storeSchema: [
        { name: 'CupDes_Id', keypath: 'CupDes_Id', options: { unique: false } },
        { name: 'CupDes_Nom', keypath: 'CupDes_Nom', options: { unique: false } },
        { name: 'CupDes_Por', keypath: 'CupDes_Por', options: { unique: false } },
        { name: 'CupDes_Tip', keypath: 'CupDes_Tip', options: { unique: false } },
        { name: 'CupDes_Sta', keypath: 'CupDes_Sta', options: { unique: false } }
      ],
    },
    {
      store: 'ls_Cat',
      storeConfig: { keyPath: 'Cat_Id', autoIncrement: false },
      storeSchema: [
        { name: 'Cat_Cia', keypath: 'Cat_Cia', options: { unique: false } },
        { name: 'Cat_Id', keypath: 'Cat_Id', options: { unique: false } },
        { name: 'Cat_Nom', keypath: 'Cat_Nom', options: { unique: false } },
      ],
    },
    {
      store: 'ls_Art',
      storeConfig: { keyPath: 'Art_Id', autoIncrement: false },
      storeSchema: [
        { name: 'Art_Cia', keypath: 'Art_Cia', options: { unique: false } },
        { name: 'Art_Id', keypath: 'Art_Id', options: { unique: false } },
        { name: 'Art_Nom', keypath: 'Art_Nom', options: { unique: false } },
        { name: 'Art_UMe', keypath: 'Art_UMe', options: { unique: false } },
        { name: 'Art_Tip', keypath: 'Art_Tip', options: { unique: false } },
        { name: 'Art_Cos', keypath: 'Art_Cos', options: { unique: false } },
        { name: 'Art_Pre1', keypath: 'Art_Pre1', options: { unique: false } },
        { name: 'Art_Pre2', keypath: 'Art_Pre2', options: { unique: false } },
        { name: 'Art_Pre3', keypath: 'Art_Pre3', options: { unique: false } },
        { name: 'Art_Pre4', keypath: 'Art_Pre4', options: { unique: false } },
        { name: 'Art_Cat', keypath: 'Art_Cat', options: { unique: false } },
        { name: 'Art_Mca', keypath: 'Art_Mca', options: { unique: false } },
        { name: 'Art_Sab', keypath: 'Art_Sab', options: { unique: false } },
        { name: 'Art_Tam', keypath: 'Art_Tam', options: { unique: false } },
        { name: 'Art_Tax', keypath: 'Art_Tax', options: { unique: false } },
        { name: 'Art_CodBar', keypath: 'Art_CodBar', options: { unique: false } },
        { name: 'Art_Fot', keypath: 'Art_Fot', options: { unique: false } },
        { name: 'Art_Rec', keypath: 'Art_Rec', options: { unique: false } },
        { name: 'Art_ToppAso', keypath: 'Art_ToppAso', options: { unique: false } },
        { name: 'Art_IsTopp', keypath: 'Art_IsTopp', options: { unique: false } },
        { name: 'Art_IsTR', keypath: 'Art_IsTR', options: { unique: false } },
        { name: 'Art_Acre', keypath: 'Art_Acre', options: { unique: false } },
        { name: 'Art_CodHda', keypath: 'Art_CodHda', options: { unique: false } },
        { name: 'Art_Act', keypath: 'Art_Act', options: { unique: false } }
      ],
    },
    {
      store: 'ls_Fopa',
      storeConfig: { keyPath: 'FoPa_Id', autoIncrement: false },
      storeSchema: [
        { name: 'FoPa_Nom', keypath: 'FoPa_Nom', options: { unique: false } },
        { name: 'FoPa_IdHda', keypath: 'FoPa_IdHda', options: { unique: false } },
        { name: 'FoPa_Act', keypath: 'FoPa_Act', options: { unique: false } }
      ],
    },
    {
      store: 'ls_tax',
      storeConfig: { keyPath: 'Tax_Id', autoIncrement: false },
      storeSchema: [
        { name: 'Tax_Id', keypath: 'Tax_Id', options: { unique: false } },
        { name: 'Tax_Nom', keypath: 'Tax_Nom', options: { unique: false } },
        { name: 'Tax_Por', keypath: 'Tax_Por', options: { unique: false } },
        { name: 'Tax_Def', keypath: 'Tax_Def', options: { unique: false } },
        { name: 'Tax_OC', keypath: 'Tax_OC', options: { unique: false } },
      ],
    },
    {
      store: 'exoneracion_td',
      storeConfig: { keyPath: 'id', autoIncrement: false },
      storeSchema: [
        { name: 'id', keypath: 'id', options: { unique: false } },
        { name: 'nombre', keypath: 'nombre', options: { unique: false } },
        { name: 'codigo_hacienda', keypath: 'codigo_hacienda', options: { unique: false } },
        { name: 'estado', keypath: 'estado', options: { unique: false } },
      ],
    },
  ],
};
