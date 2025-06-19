export interface Branch{
    id:string,
    name: string;
    address:string;
    image: string;
}
export const branches: Branch[] = [
    {
        "id": "1",
        "name": "Sucursal Centro",
        "address":"Ayaucho y Heroínas #312",
        "image": "/ubicacion1.png"
    },   
    {
        "id": "2",
        "name": "Sucursal Sur",
        "address":"Avenida Petrolera #132",
        "image": "/ubicacion2.png"
    },
    {
        "id": "3",
        "name": "Sucursal Norte",
        "address":"Avenida América #403",
        "image": "/ubicacion3.png"
    }, 
]