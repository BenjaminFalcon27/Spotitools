export default function Favorites(user) {
  
  
  if (user.favorites.length === 0) {
    return (
      <ScrollView style={styles.favoriteContainer}>
        <Text style={styles.favoriteTitle}>Mes favoris:</Text>
        <Text style={styles.favoriteText}>Aucun favori pour le moment</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => addNewFavorite()}
          >
            <Text style={styles.buttonText}>Ajouter un favori</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView style={styles.favoriteContainer}>
        <Text style={styles.favoriteTitle}>Mes favoris:</Text>
        {user.favorites.map((favorite) => (
          <TouchableOpacity key={favorite.id} style={styles.favorite}>
            <Text style={styles.favoriteText}>{favorite.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

const styles = {
  favoriteContainer: {
    marginVertical: 20,
  },
  favoriteTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  favoriteText: {
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: "center",
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  favorite: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.primary,
  },
};