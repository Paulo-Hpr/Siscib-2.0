const { request, response, head } = require('../app')
const sisCibModels = require('../models/sisCibModels')

const validation =  (request, response) => {
    return response.status(200)
}

const getAllUserRanking =  async (request, response) => {
    const UserRanking = await sisCibModels.getAllUserRanking()
    return response.status(200).json(UserRanking)
}
const getAllCias =  async (request, response) => {
    const cias = await sisCibModels.getAllCias()
    return response.status(200).json(cias)
}

const getAllVoos2 = async (request,response) =>{
    const voos = await sisCibModels.getAllVoos(request.body)
    return response.status(200).json(voos)
}
const getAllUserLider = async (request,response) =>{
    const users = await sisCibModels.getAllUserLider()
    return response.status(200).json(users)
}
const getAllTagsFilter = async (request,response) =>{
    const tags = await sisCibModels.getAllTagsFilter(request.body)
    return response.status(200).json(tags)
}
const getAllTags = async (request,response) =>{
    const {ciaId, vooId, date} = request.params
    const tags = await sisCibModels.getAllTags(ciaId, vooId, date)
    return response.status(200).json(tags)
}

const insertTag = async(request,response) => {
    const insertedTag = await sisCibModels.insertTag(request.body)
    return response.status(201).json(insertedTag)
}

const deleteTag = async (request, response) => {
    const {tag,voo,user} = request.params
    const deledetedTag = await sisCibModels.deleteTag(tag,voo,user)
    return response.status(204).json(deledetedTag)
}

const getTagSearch = async (request,response) => {
    const tags = await sisCibModels.getTagSearch(request.body)
    return response.status(200).json(tags)

    await sisCibModels.updateTask(id, request.body)
    return response.status(204).json();
  };

  const authenticationLogin = async(request,response) => {

    const httHeaders = [
        {    key: 'Access-Control-Allow-Credentials', value:'true'},
        {key: 'Access-Control-Allow-Origin', value:'*'},
        {key: 'Access-Control-Allow-Methods', value:'*'},
        {key: 'Access-Control-Allow-Headers', value:'*'},
    ]

   
    const login = await sisCibModels.authentication(request.body)
    if (!login.auth){
        return response.status(401).json(login)   
    }
       
        return response.status(200).json(login)

    
}

module.exports={
    validation,
    getAllTags,
    getAllUserRanking,
    getAllVoos2,
    getAllUserLider,
    getAllCias,
    insertTag,
    deleteTag,
    getTagSearch,
    getAllTagsFilter, 
    authenticationLogin
}