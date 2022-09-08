const getIndexPage = (req, res) => {
    res.render('index', {link: 'index'})
}

const getAboutPage = (req, res) => {
    res.render('about', {link: 'about'})
}

const getRegisterPage = (req, res) => {
    try {
        res.status(200).render('register', {link: 'register'})
    } catch (error) {
        res.status(500).send('Error')
    }
}

const getLoginPage = (req, res) => {
    try {
        res.status(200).render('login', {link: 'login'})
    } catch (error) {
        res.status(500).send('error')
    }
}

const getLogOut = (req, res) => {
    try {
        res.cookie('jwt', '', {maxAge: 1});
        res.redirect('/')
    } catch (error) {
        res.status(500).send('Error');
    }
}

export {getIndexPage, getAboutPage, getRegisterPage, getLoginPage, getLogOut};