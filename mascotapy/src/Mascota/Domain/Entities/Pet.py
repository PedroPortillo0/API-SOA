class Pet:
    def __init__(
        self,
        id: str,
        name: str,
        species: str,
        breed: str,
        birth_date: str,
        weight: float,
        height: float,
        gender: str,
        vaccines: str,
        allergies: str,
        sterilized: bool,
        user_id: str,
        image_url: str,
    ):
        self.id = id
        self.name = name
        self.species = species
        self.breed = breed
        self.birth_date = birth_date
        self.weight = weight
        self.height = height
        self.gender = gender
        self.vaccines = vaccines
        self.allergies = allergies
        self.sterilized = sterilized
        self.user_id = user_id
        self.image_url = image_url