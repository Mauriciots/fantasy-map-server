const timeFields = (): { createdAt: Date; udpatedAt: Date } => ({
  createdAt: new Date(),
  udpatedAt: new Date(),
});

export { timeFields };
