import Router, {RouterContext} from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from "../models/articles";

const articles = [
    {title: 'Hello article', fullText: 'some text to fill the body'},
    {title: 'another article', fullText: 'again here is some text here to fill'},
    {title: 'coventry university', fullText: 'some news about coventry university'},
    {title: 'smart campus', fullText: 'smart campus is coming to IVE'}
]

const router = new Router({prefix: '/api/v1/articles'});

const getAll = async (ctx: RouterContext, next: any) => {

    let articles = await model.getAll();

    if(articles.length){

        ctx.body = articles;

    } else {

        ctx.body = {};

    }
   
    await next();
}

const createArticle = async (ctx: RouterContext, next: any) => {
    //let {title: any, fullText: any} = ctx.request.body;
    let c: any = ctx.request.body;
    let title = c.title;
    let fullText = c.fullText;
    let newArticle = {title: title, fullText: fullText};
    articles.push(newArticle);
    ctx.status = 201;
    ctx.body = newArticle;
    await next();
}

const getById = async (ctx: RouterContext, next: any) => {
    let id = +ctx.params.id; 
    // string to number
    // if((id < articles.length+1) && (id > 0)) {
    //     ctx.body = articles[id-1];
    // } else {
    //     ctx.status = 404;
    // }
    let article = await model.getById(id);
    if(article.length){
        ctx.body = article[0];

    }else {
        ctx.status = 404;
    }

    await next();
}

const updateArticle = async (ctx: RouterContext, next: any) => {
    let c: any = ctx.request.body;
    let title = c.title;
    let fullText = c.fullText;
    let id = +ctx.params.id;
    // let {title, fullText} = ctx.request.body;
    let newArticle = {title: title, fullText:fullText};
    // if it exists then return the article as JSON.
    // Otherwise return a 404 Not Found status code
    if ((id < articles.length+1) && (id > 0)) {
        articles[id-1] = newArticle;
        ctx.body = newArticle;
    } else {
        ctx.status = 404;
    }
    await next();
}

const deleteArticle = async (ctx: RouterContext, next: any) => {
    let id = +ctx.params.id;
       if ((id < articles.length+1) && (id > 0)) {
           // Remove the article from the array
           articles.splice(id-1, 1);
           // Return a 204 No Content status code
           ctx.status = 204;
       } else {
           // Return a 404 Not Found status code
           ctx.status = 404;
       }
       await next();
}

// return 404 if URL not found
// router.all('*', async (ctx: RouterContext, next: any) => {
//     ctx.status = 404;
//     await next();
// });

router.get('/',getAll);
router.post('/', bodyParser() ,createArticle);
router.get('/:id([0-9]{1,})',getById);
router.put('/:id([0-9]{1,})',bodyParser(),updateArticle);
router.delete('/:id([0-9]{1,})',deleteArticle);

export { router };