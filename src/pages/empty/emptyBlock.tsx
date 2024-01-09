function Empty({ children }: { children: JSX.Element | null }): JSX.Element {
  return (
    <div className="emptyBlock">
      {children}
    </div>
  );
}

export default Empty;
