const permissions = require('./role.permission');

exports.verifyRole = (role) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return res.status(400).end()
        }

        if (!user.role) {
            return res.status(400).end();
        }

        res.role_allowed = res.role_allowed || user.role === role;

        next();
    }
}

exports.verifyPermission = (permission) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            return res.status(400).end()
        }

        if (!user.permissions) {
            return res.status(400).end();
        }

        if (!permissions.hasPermission(permission, user.role)) {
            return res.status(403).end();
        }

        next();
    }
}

exports.verifyAllowed = (req, res, next) => {
    if (!res.role_allowed) {
        return res.status(403).end();
    }
    next();
}
