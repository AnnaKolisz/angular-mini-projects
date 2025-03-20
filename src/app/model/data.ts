export interface Person {
    id: number;
    firstName: string;
    lastName: string;
    combinedName?: string;
}

export interface Employee extends Person {
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


export interface EmployeeAddress extends Person {
    location: string;
    address: string;
}

export interface Project {
    title: string;
    description: string;
    link: string;
    icon: string;
}

export interface ConfigTable {
    key: string;
    type?: string;
    link?: string;
    linkName?: string;
    columnName?: string;
}

export interface KeyTitle {
    key: string;
    title: string;
}

export interface Team {
    teamId: number;
    name: { name: string, hexColor: string }
    startDate: Date;
    endDate: Date;
    members: Person[];
}

export interface Review {
    rate: number;
    courseName: string;
    name: string;
    review: string;
    dateOfReview: Date;
}
