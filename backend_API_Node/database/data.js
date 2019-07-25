const predmeti = [
    {
        id: '1',
        naziv: 'Celovite Informacijske resitve',
        institut: 'inštitut za informatiko',
    },
    {
        id: '2',
        naziv: 'Elektrotehnika',
        institut: 'inštitut za Elektrotehniko',
    },
    {
        id: '3',
        naziv: 'Mediji in popularna kultura',
        institut: 'inštitut za medijske komunikacija',
    },
];

const zaposleni = [
    {
        id: 1,
        ime: 'Mitja',
        priimek: 'Gradisnik',
        naziv: 'Assistent',
        elektronskaPosta: 'mitja.gradnisnik@um.si',
        govorilneUre: 'tor. 11-13'
    },
    {
        id: 2,
        ime: 'Domen',
        priimek: 'Verber',
        naziv: 'docent',
        elektronskaPosta: 'domen.verber@um.si',
        govorilneUre: 'sreda. 11-13'
    },
    {
        id: 3,
        ime: 'Gregor',
        priimek: 'Polcancic',
        naziv: 'docent',
        elektronskaPosta: 'gregor.polancic@um.si',
        govorilneUre: 'pet. 11-13'
    },

]

const prostori = [
    {
        id: 1,
        stavba: 'Objekt G',
        predel: 'G2',
        nadstropje: 'Prtličje',
        StevilkaProstora: '02'
    },
    {
        id: 2,
        stavba: 'Objekt G',
        predel: 'G2',
        nadstropje: '2',
        StevilkaProstora: 'P3-DELTA'
    },
    {
        id: 3,
        stavba: 'Objekt G',
        predel: 'G3',
        nadstropje: 'Pritličje',
        StevilkaProstora: 'P1-15'
    }
];


module.exports = {
    predmeti: predmeti,
    zaposleni: zaposleni,
    prostori: prostori
}