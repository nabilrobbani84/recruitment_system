import React, { useState } from "react";
import { useRouter } from "next/navigation";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Add your reset password logic here (for example, Firebase's updatePassword function)
      // await updatePassword(auth.currentUser, newPassword);
      setError(null);
      router.push("/auth/login"); // Redirect after successful password reset
    } catch (err: unknown) {
      // Ensure proper type checking for unknown error
      if (err instanceof Error) {
        setError(err.message); // Use the error message from the Error object
      } else {
        setError("Failed to reset password. Please try again.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold">Reset Password</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleResetPassword} className="space-y-4">
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
