module.exports = toPromise

/**
 * Return a promise for a function
 * by replacing the callback (last argument) with a modified callback
 * that resolves or rejects promises based on a node-ish response (err, res)
 * @param {function} fn with node-ish callback as last argument
 */
function toPromise (fn) {
  var __slice = Array.prototype.slice
  return function () {
    var args = __slice.call(arguments, 0)
    return new Promise(function (resolve, reject) {
      var hook = function (err, res) {
        if (err) return reject(err)
        return resolve(res)
      }
      fn.apply(this, args.concat(hook))
    })
  }
}
