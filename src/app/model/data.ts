export interface Employee {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    department: string;
    compopany: string;
    jobTitle: string;
    language: string;
    race: string;
    city: string;
    country: string;
}

export interface Person{
    id: number;
    firstName: string;
    lastName: string; 
    combinedName?: string;
}

export interface Project {
    title: string;
    description: string;
    link: string;
    icon: string;
}

export interface ConfigTable{
    key: string;
    type?: string;
    link?: string;
    linkName?: string;
}

export interface KeyTitle {
    key: string;
    title: string;
}

export interface Team{
    name: string;
    startDate: Date;
    endDate: Date;
    members: Person[];
}
