const express = require('express')

const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
let router = express.Router();
router.get('/test',(req,res)=>{
    res.send({
        status: 200,
        msg: '上传成功',
    });
})
app.prepare().then(() => {
    const server = express()
    server.use(router);
    server.get('/p/:id', (req, res) => {
        const actualPage = '/post'
        const queryParams = {
            title: req.params.id
        }
        app.render(req, res, actualPage, queryParams)
    })

    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(3000, (err) => {
        if (err) throw err
        console.log('> Ready on http://localhost:3000')
    })
}).catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})