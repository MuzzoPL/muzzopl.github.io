export interface Theme {
  id: string;
  name: string;
  words: string[];
}

export const themes: Theme[] = [
  {
    id: "esportes",
    name: "Esportes",
    words: [
      "Futebol", "Basquete", "Vôlei", "Tênis", "Natação", 
      "Atletismo", "Boxe", "Judô", "Golfe", "Surfe",
      "Skate", "Ginástica", "Handebol", "Futsal", "Ciclismo",
      "Fórmula 1", "Rúgbi", "Beisebol", "Hóquei", "Esgrima"
    ]
  },
  {
    id: "jogos",
    name: "Jogos",
    words: [
      "Xadrez", "Damas", "Pôquer", "Dominó", "Banco Imobiliário",
      "Truco", "Minecraft", "Fortnite", "League of Legends", "Valorant",
      "CS:GO", "The Sims", "GTA", "Free Fire", "Roblox",
      "Super Mario", "Tetris", "Pac-Man", "Among Us", "Uno"
    ]
  },
  {
    id: "livros",
    name: "Livros",
    words: [
      "Harry Potter", "Senhor dos Anéis", "Percy Jackson", "Jogos Vorazes", "A Culpa é das Estrelas",
      "O Pequeno Príncipe", "Dom Casmurro", "A Revolução dos Bichos", "1984", "Crepúsculo",
      "O Diário de um Banana", "O Código Da Vinci", "Orgulho e Preconceito", "Duna", "O Hobbit",
      "Capitães da Areia", "A Menina que Roubava Livros", "A Bússola de Ouro", "As Crônicas de Nárnia", "Alice no País das Maravilhas"
    ]
  },
  {
    id: "personagens",
    name: "Personagens",
    words: [
      "Mickey Mouse", "Pernalonga", "Homer Simpson", "Bob Esponja", "Goku",
      "Naruto", "Pikachu", "Harry Potter", "Sherlock Holmes", "Darth Vader",
      "James Bond", "Indiana Jones", "Scooby-Doo", "Mario", "Sonic",
      "Woody", "Shrek", "Coringa", "Barbie", "Peppa Pig"
    ]
  },
  {
    id: "filmes",
    name: "Filmes",
    words: [
      "Titanic", "Avatar", "Vingadores", "O Rei Leão", "Jurassic Park",
      "Star Wars", "Matrix", "O Poderoso Chefão", "De Volta Para o Futuro", "E.T.",
      "Tubarão", "Harry Potter", "Velozes e Furiosos", "Toy Story", "Procurando Nemo",
      "A Era do Gelo", "Shrek", "Senhor dos Anéis", "Piratas do Caribe", "Homem-Aranha"
    ]
  },
  {
    id: "cantores",
    name: "Cantores",
    words: [
      "Michael Jackson", "Madonna", "Elvis Presley", "Beyoncé", "Taylor Swift",
      "Justin Bieber", "Ed Sheeran", "Adele", "Rihanna", "Lady Gaga",
      "Bruno Mars", "Katy Perry", "Freddie Mercury", "Anitta", "Roberto Carlos",
      "Ivete Sangalo", "Marília Mendonça", "Gusttavo Lima", "Luan Santana", "Eminem"
    ]
  },
  {
    id: "animais",
    name: "Animais",
    words: [
      "Cachorro", "Gato", "Leão", "Tigre", "Elefante",
      "Girafa", "Zebra", "Macaco", "Urso", "Lobo",
      "Raposa", "Coelho", "Cachorro", "Cavalo", "Vaca",
      "Galinha", "Porco", "Pato", "Ganso", "Cobra"
    ]
  },
  {
    id: "profissoes",
    name: "Profissões",
    words: [
      "Médico", "Professor", "Advogado", "Engenheiro", "Enfermeiro",
      "Arquiteto", "Policial", "Bombeiro", "Mecânico", "Motorista",
      "Cozinheiro", "Ator", "Cantor", "Jogador", "Programador",
      "Dentista", "Veterinário", "Jornalista", "Fotógrafo", "Piloto"
    ]
  },
  {
    id: "marcas",
    name: "Marcas",
    words: [
      "Apple", "Samsung", "Nike", "Adidas", "Coca-Cola",
      "Pepsi", "McDonald's", "Burger King", "Toyota", "Honda",
      "Ford", "Volkswagen", "BMW", "Mercedes", "Ferrari",
      "Google", "Microsoft", "Amazon", "Facebook", "Netflix"
    ]
  },
  {
    id: "series",
    name: "Séries",
    words: [
      "Stranger Things", "Game of Thrones", "Breaking Bad", "The Office", "Friends",
      "La Casa de Papel", "Peaky Blinders", "The Walking Dead", "Grey's Anatomy", "Lucifer",
      "Elite", "Vikings", "Black Mirror", "The Boys", "WandaVision",
      "Round 6", "Narcos", "Dark", "Loki", "Mandalorian"
    ]
  },
  {
    id: "feriados",
    name: "Feriados",
    words: [
      "Natal", "Ano Novo", "Carnaval", "Páscoa", "Dia dos Namorados",
      "Dia das Mães", "Dia dos Pais", "Dia das Crianças", "Halloween", "Independência",
      "Trabalho", "Finados", "Tiradentes", "Proclamação da República", "Consciência Negra",
      "Corpus Christi", "Nossa Senhora", "São João", "Santo Antônio", "São Pedro"
    ]
  },
  {
    id: "herois",
    name: "Super-heróis",
    words: [
      "Homem-Aranha", "Batman", "Superman", "Homem de Ferro", "Capitão América",
      "Mulher-Maravilha", "Thor", "Hulk", "Wolverine", "Flash",
      "Aquaman", "Lanterna Verde", "Pantera Negra", "Doutor Estranho", "Deadpool",
      "Viúva Negra", "Gavião Arqueiro", "Feiticeira Escarlate", "Demolidor", "Justiceiro"
    ]
  }
];
