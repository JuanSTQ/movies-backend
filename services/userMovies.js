const MongoLib = require("../lib/mongo")


class UserMovies{
  constructor(){
    this.mongoLib = new MongoLib()
    this.collection = "user-movies"
  }
  async getUserMovies(query){
    const userMovies = await this.mongoLib.getAll(this.collection,query);
    return userMovies
  }
  async getUserMovie({id}){
    const movie = await this.mongoLib.get(this.collection, id)
    return movie
  }
  createUserMovie({userMovie}){
    return this.mongoLib.create(this.collection, userMovie)
  }
  deleteUserMovie({id}){
    return this.mongoLib.delete(this.collection, id)
  }
  updateMovie({movie, id}){
    return this.mongoLib.update(this.collection, id, movie)
  }
}

module.exports = UserMovies