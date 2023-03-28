/* eslint-disable linebreak-style */
/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
import {nanoid} from 'nanoid';
const books = [];


const addBook = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  if (!name) {
    return h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    }).code(400);
  }

  if (pageCount < readPage) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku.',
    });
    response.code(400);

    return response;
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = (pageCount === readPage);
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  push(newBook);

  const isSuccess = some((book) => book.id === id);

  return isSuccess ?
    h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    }).code(201) :
    h.response({
      status: 'fail',
      message: 'Buku gagal ditambahkan',
    }).code(500);
};

const getAllBooks = (request, h) => {
  const {name, reading, finished} = request.query;

  const filteredBooks = filter((book) => {
    if (name && !book.name.toLowerCase().includes(name.toLowerCase())) {
      return false;
    }

    if (reading !== undefined && book.reading !== !!Number(reading)) {
      return false;
    }

    if (finished !== undefined && book.finished !== !!Number(finished)) {
      return false;
    }

    return true;
  });

  const response = h.response({
    status: 'success',
    data: {
      books: filteredBooks.map(({id, name, publisher}) => ({
        id,
        name,
        publisher,
      })),
    },
  }).code(200);
  return response;
};

const getBookById = (request, h) => {
  const {id} = request.params;
  const book = find((b) => b.id === id);

  if (book) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  return h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  }).code(404);
};

const editBookById = (request, h) => {
  const {id} = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = findIndex((book) => book.id === id);

  if (index !== -1) {
    if (name === undefined) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Mohon isi nama buku',
      });
      response.code(400);

      return response;
    }

    if (pageCount < readPage) {
      const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku.',
      });
      response.code(400);

      return response;
    }

    const finished = (pageCount === readPage);

    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
      updatedAt,
    };

    return h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    }).code(200);
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);

  return response;
};

const deleteBookById = (request, h) => {
  const {id} = request.params;

  const index = findIndex((note) => note.id === id);

  if (index !== -1) {
    splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);

  return response;
};

export {
  addBook,
  getAllBooks,
  getBookById,
  editBookById,
  deleteBookById,
};
