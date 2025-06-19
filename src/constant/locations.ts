export interface Location{
    id:string,
    name: string;
    address:string;
    image: string;
}
export const locations: Location[] = [
    {
        "id": "1",
        "name": "Casa centro",
        "address":"25 de mayo y Bolívar #10",
        "image": "/ubicacion1.png"
    },   
    {
        "id": "2",
        "name": "Oficina",
        "address":"Junín y Venezuela #200",
        "image": "/ubicacion2.png"
    },
    {
        "id": "3",
        "name": "Casa de mamá",
        "address":"Parque Fidel Anze #177",
        "image": "/ubicacion3.png"
    }, 
]