function SideBarIcon({ icon, text = "tooltip", onClick }) {
  return (
    <div className="sidebar-icon group" onClick={onClick}>
      {icon}
      <span className="siderbar-tooltip group-hover:scale-100 z-50">
        {text}
      </span>
    </div>
  );
}

export default SideBarIcon;
