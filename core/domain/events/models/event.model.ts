interface Responsible{
    id:string,
    name:string,
    email:string,
    role:string,
    createdAt:Date
}

export interface Event {
    id: string,
    type: string,
    responsible: Responsible,
    date: string,
    location: string
}


