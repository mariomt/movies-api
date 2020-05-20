const express = require('express');
const MoviesService = require('../services/movies');
const { 
  movieIdSchema,
  createMovieSchema,
  updateMovieSchema
} = require('../utils/schemas/movies');
const validationHandler = require('../utils/middleware/validationHandler');
function moviesApi(app) {
  const router = express.Router();
  const moviesService = new MoviesService();

  router.get('/',async (req, res, next) => {
    const {tags} = req.query;
    try {
      const movies = await moviesService.getMovies({ tags });
      res.status(200).json({data: movies, message: 'movies listed'});
    } catch (error) {
      next(error);
    }
  });

  router.get('/:movieId', validationHandler(movieIdSchema , 'params'), async (req, res, next) => {
    const {movieId} = req.params;
    try {
      const movies = await moviesService.getMovie({ movieId });
      res.status(200).json({data: movies, message: 'movies retrieved'});
    } catch (error) {
      next(error);
    }
  });

  router.post('/', validationHandler(createMovieSchema), async (req, res, next) => {
    const { body: movie } = req;
    try {
      const createdMovieId = await moviesService.createMovie({ movie });
      res.status(201).json({data: createdMovieId, message: 'movies created'});
    } catch (error) {
      next(error);
    }
  });

  router.put('/:movieId',validationHandler({ movieId: movieIdSchema}, 'params'), validationHandler(updateMovieSchema),async (req, res, next) => {
    const {movieId} = req.params;
    const { body: movie } = req;
    try {
      const updatedMovieId = await moviesService.updateMovie({
        movieId,
        movie
      });
      res.status(200).json({data: updatedMovieId, message: 'movies updated'});
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:movieId',validationHandler({ movieId: movieIdSchema }), async (req, res, next) => {
    const {movieId} = req.params;
    try {
      const deletedMovieId = await moviesService.deleteMovie({ movieId });
      res.status(200).json({data: deletedMovieId, message: 'movies deleted'});
    } catch (error) {
      next(error);
    }
  });

  app.use('/api/movies',router);
}

module.exports = moviesApi;