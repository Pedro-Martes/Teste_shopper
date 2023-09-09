import { Box, Button, Heading, Text, TextInput } from '@ignite-ui/react'
import { HomeContainer, Input, InputText, ProductBox, ProductsContainer } from './styles'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useKeenSlider } from "keen-slider/react"
import 'keen-slider/keen-slider.min.css';



export default function Home() {

    interface Products {
        code: number;
        name: string;
        cost_price: number;
        sales_price: number;
        new_price: number;
        qty: number;
        pack_id: number | null;
        product_id: number | null;
        pack_price: number | null;
    }

    const router = useRouter()
    const [products, setProducts] = useState<Products[]>([])
    const [loaded, setLoaded] = useState(false)
    const [currentSlide, setCurrentSlide] = useState(0)
  

    const [sliderRef, instanceRef] = useKeenSlider({
        loop: false,
        initial: 0,
        
        slides: {
            perView: 3.2,
            spacing: 23
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
          },
          created() {
            setLoaded(true)
          }

    })

    useEffect(() => {
        axios.get('http://localhost:3002/get')
            .then((response) => {
                setProducts(response.data)
            })
    }, [])

    return (
        <>
            <HomeContainer>

                <Heading as="h1">Teste Tecnico Shopper</Heading>

                <Button onClick={() => router.push('/sendNewPrices')}>Reajustar Preços</Button>

                <ProductsContainer ref={sliderRef} className='keen-slider'>

                    {products?.map((product) => {

                        return (

                            <ProductBox key={product.code}  className="keen-slider__slide" >

                                <Text>Codigo:</Text>
                                <Input
                                    type='number'
                                    value={product.code}
                                    disabled
                                />

                                <Text>Produto:</Text>
                                <Input
                                    placeholder='Nome do Produto'
                                    defaultValue={product.name}
                                    disabled
                                />
                                <Text>Preço atual:</Text>
                                <Input
                                    prefix='R$'
                                    type='number'
                                    value={product.sales_price}
                                    disabled
                                />
                                <Text>Preço de custo:</Text>
                                <Input
                                    prefix='R$'
                                    type='number'
                                    defaultValue={product.cost_price}
                                    disabled
                                />


                            </ProductBox >
                        )
                    })
                    }
                </ProductsContainer>
            </HomeContainer>
        </>

    )
}

