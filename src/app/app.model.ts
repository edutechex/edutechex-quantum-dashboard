export interface editServices{
    id: number
    title: string
    content: string
    imageFile: string
}

export interface addServices{
    title: string
    content: string
    imageFile: string
}

export interface editTeam{
    id: number
    name: string
    about: string
    imageFile: string
}

export interface addTeam{
    name: string
    about: string
    imageFile: string
}

export interface editCareer{
    id: number
    title: string
    about: string
    imageFile: string
}

export interface addCareer{
    title: string
    about: string
    imageFile: string
}

export interface editPartner{
    id: number
    type: string
    name: string
    imageFile: string
}

export interface addPartner{
    type: string
    name: string
    imageFile: string
}