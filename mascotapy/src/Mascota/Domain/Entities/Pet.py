class Pet:
    def __init__(
        self,
        id: str,  # Identificador único de la mascota
        name: str,  # Nombre de la mascota
        species: str,  # Especie de la mascota (por ejemplo, perro, gato)
        breed: str,  # Raza de la mascota
        birth_date: str,  # Fecha de nacimiento de la mascota
        weight: float,  # Peso de la mascota
        height: float,  # Altura de la mascota
        gender: str,  # Género de la mascota
        allergies: str,  # Alergias que tiene la mascota
        sterilized: bool,  # Indica si la mascota está esterilizada
        user_id: str,  # Identificador del dueño de la mascota
        image_url: str,  # URL de la imagen de la mascota
    ):
        self.id = id
        self.name = name
        self.species = species
        self.breed = breed
        self.birth_date = birth_date
        self.weight = weight
        self.height = height
        self.gender = gender
        self.allergies = allergies
        self.sterilized = sterilized
        self.user_id = user_id
        self.image_url = image_url