const handleAsyncError = function (fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(next)
    }
}
module.exports = handleAsyncError