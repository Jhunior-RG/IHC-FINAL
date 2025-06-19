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
        "address":"25 de mayo y Bolívar",
        "image": "/ubicacion1.png"
    },   
    {
        "id": "2",
        "name": "Oficina",
        "address":"25 de mayo y Bolívar",
        "image": "/ubicacion2.png"
    },
    {
        "id": "3",
        "name": "Casa de mamá",
        "address":"25 de mayo y Bolívar",
        "image": "/ubicacion3.png"
    }, 
]