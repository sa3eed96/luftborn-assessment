using System;
using System.Security.Cryptography;
using System.Text;

namespace Client.Classes
{
    public class PasswordManager
    {

        public string HashPassword(string inputString)
        {
            StringBuilder sb = new StringBuilder();
            HashAlgorithm algorithm = SHA512.Create();
            byte[] hashBytes = algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString));
            foreach (byte b in hashBytes)
                sb.Append(b.ToString("X2"));
            return sb.ToString();
        }


        public bool ValidatePassword(string password, string hashedPassword)
        {
            password = HashPassword(password);
            if (password == hashedPassword)
                return true;
            return false;
        }
    }
}