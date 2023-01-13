function AddFoodForm() {
  return (
    <>
      <h2>Add Food Item</h2>
      <div className="bg-white p-8">
        <form>
          <div>
            <label htmlFor="food">Food name</label>
            <input
              type="text"
              id="food"
              autoComplete="off"
              className="border rounded"
            />
          </div>
          <div>
            <label htmlFor="qty">Quantity</label>
            <input
              type="text"
              id="qty"
              autoComplete="off"
              className="border rounded"
            />
          </div>
          <button>Add Food</button>
        </form>
      </div>
    </>
  );
}

export default AddFoodForm;
