"use client"

import React from 'react';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';

import ChangeButton from '@/components/ChangeButton';
import ProfessionalDescription from './components/ProfessionalDescription';
import ProfessionalInfo from './components/ProfessionalInfo';
import ProfessionalCategory from './components/ProfessionalCategory';
import ProfessionalRaiting from './components/ProfessionalRaiting';
import axios from 'axios';

import { AiFillStar } from 'react-icons/ai'
import Button from '@/components/Button';
import { FiLogIn } from 'react-icons/fi';
import Link from 'next/link';

type NomeResponse = {
    nome: string;
};

type CategoriaResponse = {
    tipo_categoria: string;
};

type CidadeResponse = {
    cidade: string;
};

type UfResponse = {
    uf: string;
};

type CelularResponse = {
    celular: string;
};

type ObservacaoResponse = {
    observacao: string;
};

// const getProfessionalDetails = async (professionalid: string) => {
//     const professional = await prisma.prestador.findFirst({
//         where: {
//             id_user: professionalid,
//         },
//     });

//     return professional;
// }

// const fetchProfessional = async (professionalid: string) => {
//     const response = await fetch(`/professionalUser/${professionalid}/list`);

//     const json = await response.json();

//     return json;

//   };


const ProfessionalDetail = ({ params }: { params: { professionalid: string } }) => {
    const [nome, setNome] = React.useState<NomeResponse[]>([]);
    const [cidade, setCidade] = React.useState<CidadeResponse[]>([]);
    const [uf, setUf] = React.useState<UfResponse[]>([]);
    const [celular, setCelular] = React.useState<CelularResponse[]>([]);
    const [categoria, setCategoria] = React.useState<CategoriaResponse[]>([]);
    const [observacao, setObservacao] = React.useState<ObservacaoResponse[]>([]);

    React.useEffect(() => {
        axios.get(`http://localhost:3000/professionalUser/${params.professionalid}`)
            .then((response) => {
                setNome(response.data[0].nome)
                setCidade(response.data[0].cidade)
                setUf(response.data[0].uf)
                setCelular(response.data[0].celular)
                setCategoria(response.data[0].tipo_categoria)
                setObservacao(response.data[0].observacao)
            })
    });

    // const professional = fetchProfessional(params.professionalid);

    // if(!professional) return null;

    return (
        <div className='h-full'>
            <div className="relative h-[200px] w-full mb-10">
                <Image
                    src="/capa-tecnology.png"
                    fill
                    style={{
                        objectFit: "cover",
                    }}
                    alt='Imagem Capa'
                />

                <ChangeButton variant='secondary' className='absolute top-3 right-3' />
            </div>

            <div className='container relative p-4 mx-auto 2md:flex 2md:gap-10'>
                <div className='w-full 2md:w-[30%] 2md:ml-[10%] -mt-[40%] 2sm:-mt-[20%] 2md:-mt-[10%] xl:-mt-[7%] pb-3 2md:pb-0 h-full flex flex-col gap-6'>
                    <ProfessionalInfo
                        name={nome as any}
                        city={cidade as any}
                        uf={uf as any}
                        telefone={celular as any}
                    />

                    <ProfessionalCategory
                        categoria={categoria as any}
                    />
                </div>

                <div className='w-full 2md:w-3/5 2md:mr-[10%] h-full flex flex-col gap-3'>
                    <ProfessionalDescription
                        description={observacao as any}
                    />

                    <div className="relative flex flex-col bg-white dark:bg-darkBGLighter rounded-lg w-full p-8 gap-5">
                        <div className='flex justify-between'>
                            <h1 className='text-2xl font-bold flex justify-normal items-center gap-2 text-primaryDarker dark:text-white mb-3'>
                                <AiFillStar className='text-orange-400' />
                                Avaliações dos Usuários
                            </h1>

                            <Link href={`/professionalComment/${params.professionalid}`}>
                            <Button variant="outlined">
                                <FiLogIn />
                                Adicionar comentário
                            </Button>
                            </Link>
                        </div>



                        <ProfessionalRaiting name='Madrid' title='Não recomendo!' message='Ruim, péssimo profissional!' />
                        <ProfessionalRaiting name='Natan Alonso' title='FAAAAZ O L!!!!' message='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur consequatur ab vero nemo, error deserunt cumque. A aliquam atque sunt, corporis quisquam aut dolore, distinctio delectus alias magni ratione itaque.' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfessionalDetail