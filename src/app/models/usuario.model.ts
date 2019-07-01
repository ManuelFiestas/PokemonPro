export class Usuario {

    constructor(
        public id: string,
        public name: string,
        public password: string,
        public claims: any
    ) { }

}