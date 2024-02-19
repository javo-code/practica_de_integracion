export default class Services {
  constructor(dao) {
    this.dao = dao;
  }

  getAll = async () => {
    try {
      return this.dao.getAll();
    } catch (error) {
      console.log("👹 Error en el getAll del class.services => ", error);
    }
  };

  getById = async (id) => {
    try {
      const item = await this.dao.getById(id);
      if (!item) return false;
      else return item;
    } catch (error) {
      console.log("👹 Error en el getById del class.services => ", error);
    }
  };

  create = async (obj) => {
    try {
      const newItem = await this.dao.create(obj);
      if (!newItem) return false;
      else return newItem;
    } catch (error) {
      console.log("👹 Error en el create del class.services => ", error);
    }
  };

  update = async (id, obj) => {
    try {
      const item = await this.dao.getById(id);
      if (item) return false;
      else return await this.dao.update(id, obj);
    } catch (error) {
      console.log("👹 Error en el update del class.services => ", error);
    }
  };

  delete = async (id) => {
    try {
      return await this.dao.delete(id);
    } catch (error) {
      console.log("👹 Error en el delete del class.services => ", error);
    }
  };
}
