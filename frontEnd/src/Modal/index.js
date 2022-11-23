import React from "react";

import { AiOutlineClose } from 'react-icons/ai';

export default function Modal(props) {


    return (
        <>
            {props.showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative sm:w-1/2 my-6 mx-auto max-w-6xl">
                            {/*content*/}
                            <div className="border-0 p-5 rounded-3xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Dados Aluguel
                                    </h3>

                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-4 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => props.setShowModal(false)}
                                    >
                                        <span className="opacity-4 text-black  h-6 w-6 text-2xl ">
                                            <AiOutlineClose />
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div class=" mt-3 flex justify-center w-full items-center font-bold opacity-80 text-xl">
                                    <div className=''>Dados Usuário</div>
                                </div>
                                <div className=" relative flex-auto">
                                    <table class="px-3 w-full flex flex-row flex-no-wrap sm:bg-white overflow-hidden  my-5 shadow-lg  rounded-2xl">
                                        <thead class="text-white">
                                            <tr class=" rounded-md bg-[#6A64F1] flex flex-col flex-no wrap sm:table-row rounded-l-lg  mb-2 sm:mb-0">
                                                <th class="p-3 text-left">Usuário</th>
                                                <th class="p-3 text-left">E-mail</th>
                                                <th class="p-3 text-left">CPF</th>
                                                <th class="p-3 text-left">Telefone</th>


                                            </tr>
                                        </thead>
                                        <tbody class=" flex-1 sm:flex-none  ">

                                            <tr class="hover:bg-gray-100 flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0  ">
                                                <td class="p-3">{props.usuarioPesquisa.toUpperCase()}</td>
                                                <td class="p-3">{props.usuarioEmail.toUpperCase()}</td>
                                                <td class="p-3">{props.cpfPesquisa.toUpperCase()}</td>
                                                <td class="p-3">{props.usuarioTelefone.toUpperCase()}</td>
                                            </tr>

                                        </tbody>
                                    </table>

                                    {/*TABELA BIKE ALUGADA */}
                                    <div class=" mt-3 flex justify-center w-full items-center font-bold opacity-80 text-xl">
                                        <div className=''>Bicicleta Alugada</div>
                                    </div>
                                    <table class="px-3 w-full flex flex-row flex-no-wrap sm:bg-white overflow-hidden  my-5 shadow-lg  rounded-2xl">
                                        <thead class="text-white">
                                            <tr class=" rounded-md bg-[#6A64F1] flex flex-col flex-no wrap sm:table-row rounded-l-lg  mb-2 sm:mb-0">
                                                <th class="p-3 text-left">Id</th>
                                                <th class="p-3 text-left">Bicicleta</th>
                                                <th class="p-3 text-left">Marca</th>
                                                <th class="p-3 text-left">Cor</th>
                                            </tr>
                                        </thead>
                                        <tbody class=" flex-1 sm:flex-none  ">

                                            <tr class="hover:bg-gray-100 flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0  ">
                                                <td class="p-3">{props.bikeId}</td>
                                                <td class="p-3">{props.bikePesquisa.toUpperCase()}</td>
                                                <td class="p-3">{props.marcaPesquisa.toUpperCase()}</td>
                                                <td class="p-3">{props.corPesquisa.toUpperCase()}</td>

                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                                {/*footer*/}
                                <div className="mt-5  pt-5 flex items-center justify-end border-t border-solid border-slate-200 rounded-b">
                                

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}