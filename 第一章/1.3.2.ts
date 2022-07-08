class Grid {
  Width: number = 0;
  Height: number = 0;
}

class Margin {
  Left: number = 0;
  Top: number = 0;
}

function ConsolidateGrid(grid: Grid, margin: Margin): Grid & Margin {
  let consolidateGrid = <Grid & Margin>{};
  consolidateGrid.Width = grid.Width;
  consolidateGrid.Height = grid.Height;
  consolidateGrid.Left = margin.Left;
  // consolidateGrid.Top = margin.Top;

  return consolidateGrid;
}