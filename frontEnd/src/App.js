/*   
⦁ Crie um programa de cadastro de livros de uma loja (utilizando React). O programa deve implementar as funcionalidades descritas no texto abaixo:   
(0) - Crie o protótipo e anexe na atividade;   
(1) - Cadastrar livro;   
(2) - Pesquisar livro;   
O cadastro do  deve solicitar código do livro, titulo, autor, data. O programa deve respeitar as seguintes restrições:   
⦁ A pesquisa deve ser feita pelo código ou autor;    
⦁ A exclusão deve ser feita pela tabela de livros;   
(desafio) A tabela de livros deve apresentar quantos livros com o mesmo titulo existem na loja   
*/

import { useEffect, useState } from 'react';
import './App.css';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import Modal from './Modal';

function App() {
  const [alugado, setAlugado] = useState(false);

  const [alugueis, setAlugueis] = useState([]);
  const [usuarios, setUsuarios] = useState([])
  const [bikes, setBikes] = useState([])

  const [bike, setBike] = useState('');

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [telephone, setTelehpone] = useState('')


  const [nameBike, setNameBike] = useState('')
  const [model, setModel] = useState('')
  const [color, setColor] = useState('')

  // Pesquisa Aluguel MODAL
  const [pesquisaCodigo, setPesquisaCodigo] = useState('')
  const [usuarioPesquisa, setUsuarioPesquisa] = useState("");
  const [usuarioEmail, setUsuarioEmail] = useState("");
  const [usuarioTelefone, setUsuarioTelefone] = useState("");
  const [cpfPesquisa, setCpfPesquisa] = useState("");

  const [bikeId, setBikeId] = useState("");
  const [bikePesquisa, setBikePesquisa] = useState("");
  const [marcaPesquisa, setMarcaPesquisa] = useState("");
  const [corPesquisa, setCorPesquisa] = useState("");
  // FIM Pesquisa Aluguel MODAL

  const [inCadastro, setInCadastro] = useState(true);
  const [tituloInicio, setTituloInicio] = useState('Aluguel de Bicicletas');

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:9901/users')
      .then((response) => {
        setUsuarios(response.data);
      })
  }, [usuarios]);

  useEffect(() => {
    axios.get('http://localhost:9901/bikes')
      .then((response) => {
        setBikes(response.data);
      })
  }, [bikes]);

  useEffect(() => {
    axios.get('http://localhost:9901/usersRent')
      .then((response) => {
        setAlugueis(response.data);
      })
  }, [alugueis]);



  function cadastrar() {
    // let isThis = true
    // if (!codigo || !titulo || !autor || !data) { //validar preenchimento de todos os campos
    //   alert('Preencha todos os campos')
    // } else {
    //   livros.forEach(livro => {
    //     if (livro.codigo == codigo) {
    //       alert('CÓDIGO JÁ CADASTRADO!')
    //       isThis = false
    //     }
    //   });
    //   if (isThis) {
    //     let livro = {
    //       codigo: codigo,
    //       titulo: titulo,
    //       autor: autor,
    //       data: data,
    //     }
    //     //livros.push(livro)   
    //     setLivros([...livros, livro])
    //   }

    // }



    limparInputs()
  }

  async function cadastrarAluguel() { // async pois é uma função assincrona que vai aguardar a resposta do servidor para continuar
    let isValidate = true
    let userId = null

    await axios.post('http://localhost:9901/user',
      {
        name: name,
        email: email,
        cpf: cpf,
        telephone: telephone
      }).catch((error) => {
        alert(error.response.data.message)
        isValidate = false // se der erro, não cadastra

      }).then((response) => {
        setUsuarios([...usuarios, response.data]) //atualiza a lista de usuários
        userId = response.data.id // pega o id do usuário cadastrado
      })

    if (isValidate) {

      const bikeInt = parseInt(bike) //converte o valor da bike para inteiro

      axios.post('http://localhost:9901/rent',
        {
          userId: userId,
          bikeId: bikeInt

        }).catch((error) => {
          alert(error.response.data.message)
        }).then((response) => {
          setAlugueis([...alugueis, response.data]) //atualiza a lista de alugueis
          alert('Aluguel e Usuário cadastrado com sucesso!')
        })
    }

    limparInputs()
  }

  function cadastrarBike() {

    axios.post('http://localhost:9901/bike',
      {
        nameBike: nameBike,
        model: model,
        color: color,
      })
      .catch((error) => {
        alert(error.response.data.message)
      })
      .then((response) => {
        setBikes([...bikes, response.data]) //atualiza a lista de bicicletas
        alert('Bicicleta cadastrada com sucesso!')
      })

    limparInputs()
  }


  function pesquisar() {
    let isThis = false
    if (!pesquisaCodigo) {
      alert('Digite o código que deseja pesquisar!')
      isThis = true
    } else {
      alugueis.forEach((aluguel) => {
        if (aluguel.user.cpf == pesquisaCodigo) {
          setUsuarioPesquisa(aluguel.user.name);
          setUsuarioEmail(aluguel.user.email);
          setCpfPesquisa(aluguel.user.cpf);
          setUsuarioTelefone(aluguel.user.telephone);

          setBikeId(aluguel.bike.id);
          setBikePesquisa(aluguel.bike.nameBike);
          setMarcaPesquisa(aluguel.bike.model);
          setCorPesquisa(aluguel.bike.color);
          isThis = true
          setShowModal(true)
        }
      })
    }

    if (!isThis) {
      alert('Código não existe!')
    }

    
    limparInputs()
  }

  function limparInputs() {
    setName('')
    setEmail('')
    setCpf('')
    setTelehpone('')
    setPesquisaCodigo('')
    setNameBike('')
    setModel('')
    setColor('')
  }

  function excluir(codigo) {
    axios.delete(`http://localhost:9901/rent/${codigo}`)
      .catch((error) => {
        alert(error.response.data.message)
      })
      .then((response) => {
        setAlugueis(alugueis.filter((aluguel) => {
          return aluguel.id != codigo
        }))

        alert('Aluguel excluído com sucesso!')
      })
  }


  function onOff() { //Pesquisar ou Cadastrar
    if (inCadastro) {
      setInCadastro(false);
      setTituloInicio('Cadastro Bicicleta')
    } else {
      setInCadastro(true);
      setTituloInicio('Aluguel de Bicicletas')
    }
  }

  return (

    <>
      <Modal showModal={showModal} setShowModal={setShowModal}
        usuarioPesquisa={usuarioPesquisa}
        usuarioEmail={usuarioEmail}
        cpfPesquisa={cpfPesquisa}
        usuarioTelefone={usuarioTelefone}

        bikeId={bikeId}
        bikePesquisa={bikePesquisa}
        marcaPesquisa={marcaPesquisa}
        corPesquisa={corPesquisa}

      />
      <div className='containerMain'  >

        <div class="container" >
          <div className='tituloCadastro'>
            <div class="mt-5 shadow-lg p-8 sm:px-24 text-sm rounded-3xl flex flex-row justify-between items-center w-full ">
              <label for="large-toggle" class="inline-flex relative items-center cursor-pointer">
                <input onClick={onOff} type="checkbox" value="" id="large-toggle" class="sr-only peer"></input>
                <div class="w-16 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 dark:peer-focus:ring-blue-100 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[8px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-[#6A64F1]"></div>
                <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
              </label>

              <div className='tituloCadastro'>{tituloInicio}</div>
            </div>
          </div>

          {
            inCadastro && (
              <>

                <div class="shadow-lg px-3 rounded-3xl p-7"> {/*INPUTS CADASTRO */}

                  <div class="mx-auto w-full mt-8 ">
                    <div class='mb-5 text-2xl font-bold opacity-80 text-center '>Preencha seus Dados</div>
                    <div class="-mx-3 flex flex-wrap">
                      <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-5">

                          <label
                            for="nome"
                            class="mb-3 block text-base font-medium text-[#07074D]"
                          >
                            Nome
                          </label>
                          <input
                            onChange={((e) => { setName(e.target.value) })} value={name}
                            type="text"
                            name="nome"
                            id="nome"
                            placeholder="Nome"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          />
                        </div>
                      </div>
                      <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-5">
                          <label
                            for="email"
                            class="mb-3 block text-base font-medium text-[#07074D]"
                          >
                            E-mail
                          </label>
                          <input
                            onChange={((e) => { setEmail(e.target.value) })} value={email}
                            type="text"
                            name="email"
                            id="email"
                            placeholder="E-mail"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          />
                        </div>
                      </div>
                      <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-5">
                          <label
                            for="cpf"
                            class="mb-3 block text-base font-medium text-[#07074D]"
                          >
                            CPF
                          </label>
                          <input
                            onChange={((e) => { setCpf(e.target.value) })} value={cpf}
                            type="text"
                            name="cpf"
                            id="cpf"
                            placeholder="CPF"
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          />
                        </div>
                      </div>
                      <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-5">
                          <label
                            for="date"
                            class="mb-3 block text-base font-medium text-[#07074D]"
                          >
                            Telefone
                          </label>
                          <input
                            onChange={((e) => { setTelehpone(e.target.value) })} value={telephone}
                            type="tel"
                            name="telefone"
                            id="telefone"
                            placeholder='Telefone'
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-5 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          />
                        </div>
                      </div>

                      <div class="w-full px-3 sm:w-1/2">
                        <div class="mb-5">
                          <label
                            for="date"
                            class="mb-3 block text-base font-medium text-[#07074D]"
                          >
                            Selecione a Bicicleta
                          </label>
                          <select onChange={((e) => { setBike(e.target.value) })} value={bike} //idBike
                            class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-5 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                          >
                            <option value="" data-default disabled selected>Selecione a Bicicleta</option>
                            {

                              bikes.map((bike) => { // SELECIONA SOMENTE AS BICICLETAS QUE ESTÃO DISPONÍVEIS 
                                
                                if(bike.rent == false){
                                  return (
                                    <option value={bike.id}>{bike.nameBike}</option>
                                  )
                                }else{
                                  return (
                                    <option className='text-red-500' value={bike.id} disabled>{`${bike.nameBike} - Alugado`}</option>
                                  )
                                }

                              })}
                          </select>
                        </div>
                      </div>


                      <div class="w-full px-3 sm:w-1/1">
                        <label
                          for=""
                          class="sm:mb-9 block text-base"
                        >
                        </label>
                        <button
                          onClick={cadastrarAluguel}
                          class="hover:bg-[#706bf4] hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        >
                          Alugar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <table class="px-3 w-full flex flex-row flex-no-wrap sm:bg-white shadow-lg rounded-2xl overflow-hidden my-5 "> TABELA CADASTRO
                  <thead class="text-white">
                    {
                      alugueis.map(() => {
                        return (
                          <tr class="rounded-md bg-[#6A64F1] flex flex-col flex-no wrap sm:table-row rounded-l-lg mb-2 sm:mb-0 outline-none">
                            <th class="p-3 text-left">Código</th>
                            <th class="p-3 text-left">Título</th>
                            <th class="p-3 text-left">Autor</th>
                            <th class="p-3 text-left">Data</th>
                            <th class="p-3 text-left " width="110px">Excluir</th>
                          </tr>
                        )
                      })
                    }

                  </thead>
                  <tbody class="flex-1 sm:flex-none ">
                    {
                      alugueis.map((aluguel) => {
                        return (
                          <tr class="hover:bg-gray-100 flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0  ">
                            <td class="p-3">{aluguel.id}</td>
                            <td class="p-3">{aluguel.user}</td>
                            <td class="p-3">{aluguel.email}</td>
                            <td class="p-3">{aluguel.cpf}</td>
                            <td class="p-3 "><button onClick={() => excluir(aluguel.codigo)}><FaTrashAlt /></button></td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table> */}

                {/* <div class="shadow-lg rounded-2xl font-semibold text-gray-700 mb-3 ">
                  <p class="p-3 text-left">Livros com mesmo título: {titulosIguais()}</p>
                </div> */}

              </>
            )
          }


          {
            !inCadastro && ( //TABELA ALUGUEL
              <>
                <div className="containerPesquisa"> {/*PESQUISA*/}

                  <div className='Inputpesquisa' class="  flex flex-wrap shadow-lg p-7 rounded-3xl mt-5 ">
                    <div class="w-full  sm:px-3 sm:w-1/3 mt-5 ">
                      <div class="mb-3">
                        <label
                          for=""
                          class="mb-3 block text-base font-medium text-[#07074D]"
                        >
                          Bicicleta
                        </label>
                        <input
                          onChange={((e) => { setNameBike(e.target.value) })} value={nameBike}
                          type="text"
                          name="bicicleta"
                          id="bicicleta"
                          placeholder='Bicicleta'
                          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                    </div>

                    <div class="w-full  sm:w-1/3 sm:px-3 mt-5 ">
                      <div class="mb-3">
                        <label
                          for="Marca"
                          class="mb-3 block text-base font-medium text-[#07074D]"
                        >
                          Marca
                        </label>
                        <input
                          onChange={((e) => { setModel(e.target.value) })} value={model}
                          type="text"
                          name="Marca"
                          id="Marca"
                          placeholder='Marca'
                          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                    </div>

                    <div class="w-full sm:px-3 sm:w-1/3 mt-5 ">
                      <div class="mb-3">
                        <label
                          for="Cor"
                          class="mb-3 block text-base font-medium text-[#07074D]"
                        >
                          Cor
                        </label>
                        <input
                          onChange={((e) => { setColor(e.target.value) })} value={color}
                          type="text"
                          name="Cor"
                          id="Cor"
                          placeholder='Cor'
                          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                    </div>

                    <div class="w-full sm:px-3 sm:w-1/1 ">
                      <label
                        for=""
                        class="sm:mb-5 block text-base"
                      >
                      </label>
                      <button
                        onClick={cadastrarBike}
                        class="hover:bg-[#706bf4] hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                      >
                        Cadastrar
                      </button>
                    </div>

                    <div class="w-full sm:px-3 sm:w-1/2 mt-10 "> {/*TABELA PESQUISA*/}
                      <div class="mb-3">
                        <label
                          for=""
                          class="mb-3 block text-base font-medium text-[#07074D]"
                        >
                          Pesquisar Alugueis
                        </label>
                        <input
                          onChange={((e) => { setPesquisaCodigo(e.target.value) })} value={pesquisaCodigo}
                          type="text"
                          name="Código Aluguel"
                          id="Código Aluguel"
                          placeholder='CPF Usuário'
                          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                      </div>
                    </div>

                    <div class="w-full sm:px-3 sm:w-1/1 ">
                      <label
                        for=""
                        class="sm:mb-5 block text-base"
                      >
                      </label>
                      <button
                        onClick={pesquisar}
                        class="hover:bg-[#706bf4] hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                      >
                        Pesquisar
                      </button>
                    </div>

                  </div>

                  <div class="container mt-5 shadow-lg p-5 rounded-3xl" >
                    <div className=''>
                      <div class=" flex justify-center w-full items-center font-bold opacity-80 text-2xl">
                        <div className=''>Tabela de Alugueis</div>
                      </div>

                    </div>

                  </div>

                  <table class="px-3 w-full flex flex-row flex-no-wrap sm:bg-white shadow-lg rounded-2xl overflow-hidden my-5 ">
                    <thead class="text-white">
                      {
                        alugueis.map(() => {
                          return (
                            <tr class="rounded-md bg-[#6A64F1] flex flex-col flex-no wrap sm:table-row rounded-l-lg mb-2 sm:mb-0 outline-none">
                              <th class="p-3 text-left">Nome</th>
                              <th class="p-3 text-left">CPF</th>
                              <th class="p-3 text-left">Bicicleta</th>
                              <th class="p-3 text-left">Marca</th>
                              <th class="p-3 text-left " width="110px">Excluir</th>
                            </tr>
                          )
                        })
                      }

                    </thead>
                    <tbody class="flex-1 sm:flex-none ">
                      {
                        alugueis.map((aluguel) => {
                          return (
                            <tr class="hover:bg-gray-100 flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0  ">
                              <td class="p-3">{aluguel.user.name.toUpperCase()}</td>
                              <td class="p-3">{aluguel.user.cpf.toUpperCase()}</td>
                              <td class="p-3">{`${aluguel.bike.nameBike.toUpperCase()} - ID: ${aluguel.bike.id}`}</td>
                              <td class="p-3">{aluguel.bike.model.toUpperCase()}</td>
                              <td class="p-3 "><button onClick={() => excluir(aluguel.id)}><FaTrashAlt /></button></td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>

                </div>
              </>
            )
          }


        </div>
      </div>

    </>

  );
}

export default App;