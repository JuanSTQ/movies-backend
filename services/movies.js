const MongoLib = require("../lib/mongo")


class Movies{
  constructor(){
    this.mongoLib = new MongoLib()
    this.collection = "movies"
  }
  async getMovies(query){
    const movies = await this.mongoLib.getAll(this.collection,query);
    return movies
  }
  async getMovie({id}){
    const movie = await this.mongoLib.get(this.collection, id)
    return movie
  }
  createMovie({movie}){
    return this.mongoLib.create(this.collection, movie)
  }
  deleteMovie({id}){
    return this.mongoLib.delete(this.collection, id)
  }
   updateMovie({movie, id}){
    return this.mongoLib.update(this.collection, id, movie)
  }
}

module.exports = Movies