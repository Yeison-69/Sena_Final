export default function ParcheCard({ user }) {
  return (
    <div
      style={{
        width: "90%",
        maxWidth: 350,
        background: "#fff",
        padding: 20,
        borderRadius: 16,
        textAlign: "center",
        boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
      }}
    >
      <img
        src={user.foto || "https://via.placeholder.com/350"}
        alt="foto"
        style={{
          width: "100%",
          height: 300,
          objectFit: "cover",
          borderRadius: 12,
          marginBottom: 20,
        }}
      />

      <h2 style={{ fontSize: 24 }}>{user.nombre}</h2>
      <p style={{ color: "#555", marginTop: 10 }}>
        {user.descripcion || "Sin descripción"}
      </p>
    </div>
  );
}
