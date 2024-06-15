export const deleteExpiryNotifications = (store) => (next) => (action) => {
  if (action.type === "groceries/updateGrocery") {
    const state = store.getState();
    const { id: groceryId, expiryDate } = action.payload;
    if (expiryDate) {
      const eventsToDelete = state.events.events.filter(
        (event) =>
          event.extendedProps.groceryId === groceryId &&
          event.extendedProps.choreId === "5"
      );

      eventsToDelete.forEach((event) => {
        store.dispatch({
          type: "calendar/removeEvent",
          payload: event.id,
        });
      });
    }
  }

  return next(action);
};

export const deleteLocationRelatedGroceries = (store) => (next) => (action) => {
  if (action.type === "groceries/removeLocation") {
    const locationId = action.payload;
    const state = store.getState();
    const relatedGroceries = state.groceries.groceries.filter(
      (grocery) => grocery.locationId === locationId
    );

    relatedGroceries.forEach((grocery) => {
      store.dispatch({ type: "groceries/removeGrocery", payload: grocery.id });
    });
  }

  return next(action);
};

export const deleteCategoryRelatedGroceries = (store) => (next) => (action) => {
  if (action.type === "groceries/removeCategory") {
    const categoryId = action.payload;
    const state = store.getState();
    const relatedGroceries = state.groceries.groceries.filter(
      (grocery) => grocery.categoryId === categoryId
    );

    relatedGroceries.forEach((grocery) => {
      store.dispatch({ type: "groceries/removeGrocery", payload: grocery.id });
    });
  }

  return next(action);
};

export const deleteGroceryRelatedEvents = (store) => (next) => (action) => {
  if (action.type === "groceries/removeGrocery") {
    const groceryId = action.payload;
    const state = store.getState();
    const relatedEvents = state.events.events.filter(
      (event) => event.extendedProps.groceryId === groceryId
    );

    relatedEvents.forEach((event) => {
      store.dispatch({ type: "calendar/removeEvent", payload: event.id });
    });
  }

  return next(action);
};
