// Mendapatkan referensi elemen-elemen HTML
const hint = document.getElementById("hint");
const noOfGuessesRef = document.getElementById("no-of-guesses");
const guessedNumsRef = document.getElementById("guessed-nums");
const restartButton = document.getElementById("restart");
const game = document.getElementById("game");
const guessInput = document.getElementById("guess");
const checkButton = document.getElementById("check-btn");

// Variabel untuk menyimpan jawaban, jumlah tebakan, dan daftar tebakan yang sudah dilakukan
let answer, noOfGuesses, guessedNumsArr;

// Fungsi untuk memulai permainan
const play = () => {
  // Mendapatkan tebakan pengguna dari input
  const userGuess = guessInput.value;

  // Validasi input pengguna
  if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
    // Menampilkan pesan kesalahan jika input tidak valid
    alert("Please enter a valid number between 1 and 100.");
    return;
  }

    // Menambahkan tebakan pengguna ke dalam array
  guessedNumsArr.push(userGuess);

  // Menambah jumlah tebakan
  noOfGuesses += 1;

  // Memeriksa apakah tebakan benar atau salah
  if (userGuess != answer) {
    // Menampilkan petunjuk jika tebakan salah
    if (userGuess < answer) {
      hint.innerHTML = "Too low. Try Again!";
    } else {
      hint.innerHTML = "Too high. Try Again!";
    }
    // Memperbarui tampilan jumlah tebakan dan daftar tebakan
    noOfGuessesRef.innerHTML = `<span>No. Of Guesses:</span> ${noOfGuesses}`;
    guessedNumsRef.innerHTML = `<span>Guessed Numbers are: </span>${guessedNumsArr.join(
      ","
    )}`;

    // Animasi efek pada petunjuk
    hint.classList.remove("error");
    setTimeout(() => {
      hint.classList.add("error");
    }, 10);
  } else {
    // Menampilkan pesan keberhasilan jika tebakan benar
    hint.innerHTML = `Selamat!<br>Angkanya adalah <span>${answer}</span>.<br>Anda berhasil menebak angka tersebut dalam <span>${noOfGuesses} </span>percobaan.`;
    // Menambahkan kelas untuk tampilan pesan keberhasilan
    hint.classList.add("success");
    
    // Menyembunyikan permainan dan menampilkan tombol restart
    game.style.display = "none";
    restartButton.style.display = "block";
  }
};
// Fungsi untuk menginisialisasi permainan
const init = () => {
  console.log("Game Started");

  // Menghasilkan jawaban acak antara 1 dan 100
  answer = Math.floor(Math.random() * 100) + 1;
  console.log(answer);
  // Mengatur ulang jumlah tebakan dan daftar tebakan
  noOfGuesses = 0;
  guessedNumsArr = [];
  // Mengatur ulang tampilan jumlah tebakan dan daftar tebakan
  noOfGuessesRef.innerHTML = "No. Of Guesses: 0";
  guessedNumsRef.innerHTML = "Guessed Numbers are: None";
  // Mengatur ulang nilai input dan kelas pesan
  guessInput.value = "";
  hint.classList.remove("success", "error");
};

// Mendengarkan tombol enter pada input untuk melakukan tebakan
guessInput.addEventListener("keydown", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    play();
  }
});
// Mendengarkan klik tombol restart untuk mengulang permainan
restartButton.addEventListener("click", () => {
  // Menampilkan kembali permainan dan menyembunyikan tombol restart
  game.style.display = "grid";
  restartButton.style.display = "none";
  // Mengatur ulang pesan petunjuk
  hint.innerHTML = "";
  hint.classList.remove("success");
    // Memulai permainan baru

  init();
});
// Mendengarkan klik tombol tebak untuk melakukan tebakan
checkButton.addEventListener("click", play);
// Mendengarkan peristiwa saat halaman dimuat untuk menginisialisasi permainan
window.addEventListener("load", init);
