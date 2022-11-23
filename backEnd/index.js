const express = require('express');
const cors = require('cors');
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();
const server = express();

server.use(cors());
server.use(express.json());

server.get('/users', async (req, res) => { // LISTAR TODOS OS USUÁRIOS
    
    const users = await prisma.user.findMany();
    return res.json(users);
});

server.post('/user', async (req, res) => { //CRIAR USUÁRIO
    const {name, email, cpf, telephone} = req.body;

    //VALIDAÇÕES
    if(!name || !email || !cpf || !telephone){
        res.status(400).json({message: 'Preencha todos os campos'});
        return;
    }

    if (cpf.length !== 11){
        res.status(400).json({message: 'CPF inválido'});
        return;
    }

    const validate = await prisma.user.findUnique({
        where: {
            cpf: cpf
        }
    });
    

    if(validate){
        res.status(400).json({message: 'Usuário já cadastrado'});
        return; //FIM VALIDAÇÕES
    } else {
        const user = await prisma.user.create({

            data: {
                name,
                email,
                cpf,
                telephone
            }
        });

        return res.status(200).json(user);
    }
});

server.post('/bike', async (req, res) => { //CRIAR BICICLETA
    const {nameBike, model, color} = req.body;

    if(!nameBike || !model || !color){
        return res.status(400).json({message: 'Preencha todos os campos'});
    } else {
        const bike = await prisma.bike.create({
            data: {
                nameBike,
                model,
                color,
            }
        });
        return res.json(bike);
        
    }
    

    
});

server.get('/bikes', async (req, res) => { // LISTAR TODAS AS BICICLETAS
    
    const bikes = await prisma.bike.findMany();
    return res.json(bikes);
});

server.post('/rent', async (req, res) => { // ALUGAR BICICLETA
    const {userId, bikeId} = req.body;

    if(!userId || !bikeId){
        res.status(400).json({message: 'Preencha todos os campos'});
        return;
    }

    const rent = await prisma.rent.create({
        data: {
            userId,
            bikeId
        }
    });

    res.json(rent);
});

server.get('/rents', async (req, res) => { // LISTAR TODOS OS ALUGUEIS
    const rent = await prisma.rent.findMany();
    return res.json(rent);
});

server.get ('/usersRent', async (req, res) => { //USUÁRIOS QUE ALUGARAM BICICLETA
    const usersRent = await prisma.rent.findMany({
        include: {
            user: true,
            bike: true
        }
    });

    res.json(usersRent);
});

server.delete('/rent/:id', async (req, res) => { //DEVOLVER BICICLETA
    const {id} = req.params;

    const rent = await prisma.rent.delete({
        where: {
            id: Number(id)
        }
    });

    return res.json({message: 'Bicicleta devolvida com sucesso'});
});

server.listen(9901, () => {
    console.log('Server is running on port 9901');
});