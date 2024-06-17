import express from 'express';
import { Book } from '../bookModel.js';
const router=express.Router()
router.post('/',async (req,res)=>{
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear)
            {
                return res.status(400).send({msg:'Send all the required fields: Title Author PublishYear'})
            }
            const newbook={
                title:req.body.title,
                author:req.body.author,
                publishYear:req.body.publishYear
            };
            const book=await Book.create(newbook)
            return res.status(201).send(book)
    }
    catch(error)
    {
        res.status(404).send({msg:error})
    }
})
//Get all books
router.get('/',async(req,res)=>{
    try{
        const book=await Book.find({})
       return res.status(200).json({
        count:book.length,
        data:book})
    }
    catch(error)
    {
        res.status(404).send({msg:error})
    }
})
//Get single book
router.get('/:id',async(req,res)=>{
    try{
        const {id}=req.params
        const book= await Book.findById(id)
        return res.status(200).json(book);

    }catch(error){
        return res.status(500).send({msg:error})
    }
})
//Update a book
router.put('/:id',async(req,res)=>{
    try{
        const {id}=req.params
        if(!req.body.title || !req.body.author || !req.body.publishYear)
            {
                return res.status(400).send({msg:'Send all the required fields: Title Author PublishYear'})
            }
        const book=await Book.findByIdAndUpdate(id,req.body)
        if(!book)
            {
                return res.json({msg:'Book not found'})
            }
        return res.status(200).send({msg:'Book updated succesfully'})
        
    }
    catch(error){
        return res.status(404).send({msg:error})
    }
})
//Delete a book
router.delete('/:id',async(req,res)=>{
    try{
        const {id}=req.params
        
        const book=await Book.findByIdAndDelete(id,req.body)
        if(!book)
            {
                return res.json({msg:'Book not found'})
            }
        return res.status(200).send({msg:'Book deleted succesfully'})
        
    }
    catch(error){
        return res.status(404).send({msg:error})
    }
})
export default router;