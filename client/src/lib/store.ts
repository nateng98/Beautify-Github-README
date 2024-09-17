import { doc, getDoc } from 'firebase/firestore'; // Import Firestore functions for fetching documents
import { create } from 'zustand'; // Import Zustand to create a state management store
import { persist } from 'zustand/middleware'; // Import persist middleware for persisting the store state
import { db } from './firebase'; // Import the Firebase Firestore instance
import { ProductProps } from '../../type'; // Import ProductProps type for defining the product structure

// Define the CartProduct interface, extending ProductProps and adding quantity
interface CartProduct extends ProductProps {
  quantity: number;
}

// Define the UserType interface to specify the structure of user data
interface UserType {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  avatar: string;
  id: string;
}

// Define the StoreType interface for the state management store
interface StoreType {
  // User properties and methods
  currentUser: UserType | null;
  isLoading: boolean;
  getUserInfo: (uid: any) => Promise<void>;
  
  // Cart-related properties and methods
  cartProduct: CartProduct[];
  addToCart: (product: ProductProps) => Promise<void>;
  decreaseQuantity: (productId: number) => void;
  removeFromCart: (productId: number) => void;
  resetCart: () => void;

  // Favorite-related properties and methods
  favoriteProduct: CartProduct[];
  addToFavorite: (product: ProductProps) => Promise<void>;
  removeFromFavorite: (productId: number) => void;
  resetFavorite: () => void;
}

// Custom localStorage handler for persisting state
const customStorage = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null; // Parse the stored string value
  },
  setItem: (name: string, value: any) => {
    localStorage.setItem(name, JSON.stringify(value)); // Stringify and store the value
  },
  removeItem: (name: string) => {
    localStorage.removeItem(name); // Remove the item from localStorage
  },
};

// Create Zustand store with persist middleware to manage app state
export const store = create<StoreType>()(
  persist(
    (set) => ({
      currentUser: null, // Initialize currentUser as null
      isLoading: true,   // Set loading state to true
      cartProduct: [],   // Initialize cartProduct array as empty
      favoriteProduct: [], // Initialize favoriteProduct array as empty

      // Function to fetch and set user info based on uid
      getUserInfo: async (uid: any) => {
        if (!uid) return set({ currentUser: null, isLoading: false }); // If no UID, set currentUser to null

        const docRef = doc(db, 'users', uid); // Create Firestore document reference for the user
        const docSnap = await getDoc(docRef); // Fetch the user document

        try {
          if (docSnap.exists()) { // Check if the document exists
            set({ currentUser: docSnap.data() as UserType, isLoading: false }); // Set the fetched user data
          }
        } catch (error) {
          console.log('getUserInfo error', error); // Log errors, if any
          set({ currentUser: null, isLoading: false }); // Handle error by setting currentUser to null
        }
      },

      // Function to add a product to the cart
      addToCart: (product: ProductProps) => {
        return new Promise<void>((resolve) => {
          set((state: StoreType) => {
            const existingProduct = state.cartProduct.find(
              (p) => p._id === product._id // Check if the product already exists in the cart
            );

            if (existingProduct) {
              return {
                cartProduct: state.cartProduct.map((p) =>
                  p._id === product._id
                    ? { ...p, quantity: (p.quantity || 0) + 1 } // If product exists, increase its quantity
                    : p
                ),
              };
            } else {
              return {
                cartProduct: [
                  ...state.cartProduct,
                  { ...product, quantity: 1 }, // If product doesn't exist, add it with quantity 1
                ],
              };
            }
          });
          resolve(); // Resolve the promise
        });
      },

      // Function to decrease product quantity in the cart
      decreaseQuantity: (productId: number) => {
        set((state: StoreType) => {
          const existingProduct = state.cartProduct.find(
            (p) => p._id === productId // Find the product in the cart by its ID
          );

          if (existingProduct) {
            return {
              cartProduct: state.cartProduct.map((p) =>
                p._id === productId
                  ? { ...p, quantity: Math.max(p.quantity - 1, 1) } // Decrease quantity, but not below 1
                  : p
              ),
            };
          } else {
            return state; // If product is not found, return the existing state
          }
        });
      },

      // Function to remove a product from the cart
      removeFromCart: (productId: number) => {
        set((state: StoreType) => ({
          cartProduct: state.cartProduct.filter(
            (item) => item._id !== productId // Remove the product from cart by filtering it out
          ),
        }));
      },

      // Function to reset the cart (empty it)
      resetCart: () => {
        set({ cartProduct: [] }); // Clear the cart by setting it to an empty array
      },

      // Function to add/remove a product from favorites
      addToFavorite: (product: ProductProps) => {
        return new Promise<void>((resolve) => {
          set((state: StoreType) => {
            const isFavorite = state.favoriteProduct.some(
              (item) => item._id === product._id // Check if the product is already in favorites
            );
            return {
              favoriteProduct: isFavorite
                ? state.favoriteProduct.filter(
                    (item) => item._id !== product._id // If it is, remove it
                  )
                : [...state.favoriteProduct, { ...product }], // If not, add it
            };
          });
          resolve(); // Resolve the promise
        });
      },

      // Function to remove a product from favorites
      removeFromFavorite: (productId: number) => {
        set((state: StoreType) => ({
          favoriteProduct: state.favoriteProduct.filter(
            (item) => item._id !== productId // Remove the product by filtering it out of favorites
          ),
        }));
      },

      // Function to reset the favorite list (empty it)
      resetFavorite: () => {
        set({ favoriteProduct: [] }); // Clear the favorite list
      },
    }),
    {
      name: 'electrahub-1607-storage', // Specify a unique name for the persisted storage
      storage: customStorage, // Use the custom localStorage handler for persistence
    }
  )
);