export const UncontrolledForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log('Uncontrolled:', data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input name="name" className="border p-2 w-full" />
      </label>
      <label>
        Email:
        <input name="email" className="border p-2 w-full" />
      </label>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};
