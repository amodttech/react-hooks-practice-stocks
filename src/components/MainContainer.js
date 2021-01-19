import React, {useState, useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {


  const [portfolio, setPortfolio] = useState([])
  const [stocksList, setStocksList] = useState([])
  const [sort, setSort] = useState("Alphabetically")
  const [filter, setFilter] = useState("Tech")

  useEffect(() => {
    fetch(`http://localhost:3001/stocks`)
    .then(r => r.json())
    .then(setStocksList)
  }, [])


  const sortedStocks = [...stocksList].sort((stock1, stock2) => {
    if (sort === "Alphabetically") {
      return stock1.name.localeCompare(stock2.name)
    } else {
      return stock1.price - stock2.price
    }
  })

  const filteredStocks = sortedStocks.filter(
    (stock) => stock.type === filter
  )

  function onBuyHandler(stockToAdd){
    addToPortfolio(stockToAdd)
  }

  function addToPortfolio(stockToAdd){
    setPortfolio([...portfolio, stockToAdd])
  }

  function onSellHandler(stockToRemove){
    setPortfolio((portfolio) =>
    portfolio.filter( (stock) => stock.id !== stockToRemove.id)
    )
  }


  return (
    <div>
      <SearchBar 
        sortBy={sort}
        onChangeSort={setSort}
        onChangeFilter={setFilter}
        filterBy={filter}
      />
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filteredStocks} onBuyHandler={onBuyHandler} />
        </div>
        <div className="col-4">
          <PortfolioContainer portfolio={portfolio} onSellHandler={onSellHandler}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
