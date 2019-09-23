/**
 * pipeWithErrors pipes two streams and in the case of an error
 * it will emit an error that will reach to the whole chain of
 * pipes. Otherwise with a simple pipe, the error will not reach
 * to the last pipe.
 * @param {Stream} src source stream.
 * @param {Stream} dest destiny stream.
 */
const pipeWithErrors = (src, dest) => {
  src.pipe(dest);
  src.once('error', (err) => {
    dest.emit('error', err);
  });
  return dest;
};

module.exports = {
  pipeWithErrors,
};
