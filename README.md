<img width="200" height="200" alt="Image" src="https://github.com/user-attachments/assets/bf05a806-b482-40fe-8af4-f45b184306b5" align="left"/><br>
- [What ? 🤷‍♂️](#what)  
- [How ? 🕵️‍♂️](#how)  
- [Setup ⚙️](#setup)
- [Credits 🙏](#credits)  
- [License 📜](#license)

<img width="1101" height="911" alt="image" src="https://github.com/user-attachments/assets/167bb870-1f82-4f00-8ab3-a06f37bd2f78" />

# <a id="what"></a>What ? 🤷‍♂️
**NullMoji** is stealth for the modern web.
It encrypts your message and invisibly embeds it inside innocent-looking kaomojis (or any text) using zero-width characters.

>To humans, it’s just text.
>To NullMoji, it’s a hidden, encrypted payload 👁️‍🗨️

## 🚀 Key Features
* **🔒 Military-Grade Encryption:** Optional AES encryption ensures that even if the text is detected, it cannot be read without the secret password
* **👻 Zero-Width Steganography:** Hides data using Unicode characters that do not render on screen
* **📚 Kaomoji Library:** Built-in picker with categories (Thinking, Joy, Love, etc.) to find the perfect carrier
* **⚡ Client-Side Only:** All encryption and processing happens in your browser. No data is ever sent to server

# <a id="how"></a>How ? 🕵️‍♂️
![Image](https://github.com/user-attachments/assets/71f67465-1c49-4606-951a-779731a08c83)
>NullMoji combines **AES Encryption** with **Zero-Width Steganography**
### 🔁 The Pipeline 
1.  **Encryption:** Your secret text (e.g., "Hi") is encrypted using `AES-256` with your password.
2.  **Binary Conversion:** The encrypted string is converted into 8-bit binary (`010010...`).
3.  **Invisible Mapping:**
    * `0` ➔ `\u200B` (Zero Width Space)
    * `1` ➔ `\u200C` (Zero Width Non-Joiner)
4.  **Injection:** The string of invisible characters is inserted into the center of the carrier Kaomoji.
   ### 👀 The Visual Proof
| Step | Data | Visual Output |
| :--- | :--- | :--- |
| **Input** | `Secret` | - |
| **Carrier** | `(^_^)` | `(^_^)` |
| **Result** | `(^` + `[Invisible Payload]` + `_^)` | **`(^_^)`** |

# <a id="setup"></a>Setup ⚙️

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/itssagnikmukherjee/NullMoji.git](https://github.com/itssagnikmukherjee/NullMoji.git)
    cd NullMoji
    ```

2.  **Install dependencies**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  Open `http://localhost:5173` in your browser.

---

## <a id="credits"></a>Credits 🙏
* [Kaomoji](https://kaomoji.ru/en/) — For the endless library of expressions.
* [shadcn/ui](https://ui.shadcn.com/) — For the razor-sharp, "coolest" UI architecture.
* [React Bits](https://reactbits.dev/) — For the awesome interactive component magic.

## <a id="license"></a>License 📜
Distributed under the MIT License. See `LICENSE` for more information
