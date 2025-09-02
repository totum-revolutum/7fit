import { useEffect, useMemo, useState } from "react";
import styles from "./PricesAdmin.module.scss";
import { usePricesStore } from "@stores/pricesStore";
import type { PriceItem } from "@api/prices";
import { buildTrainingName, formatPriceUAH, parseCountFromName } from "@features/format";

const CATEGORIES = ["ДЗЮДО/БОКС", "EMS", "EMS-massage"] as const;

type RowEditState = {
  id: number;
  category: string;
  rawName: string;
  rawPrice: string;
  isTrial: boolean;
};

const PricesAdmin = () => {
  const { prices, loading, error, fetchPrices, addPrice, updatePrice, deletePrice } =
    usePricesStore();

  const [newCategory, setNewCategory] = useState<typeof CATEGORIES[number]>("EMS");
  const [newIsTrial, setNewIsTrial] = useState(false);
  const [newCount, setNewCount] = useState<string>("1");
  const [newPrice, setNewPrice] = useState<string>("0");
  const [formError, setFormError] = useState<string | null>(null);

  const [editRows, setEditRows] = useState<Record<number, RowEditState>>({});

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  const grouped = useMemo(() => {
    const byCat: Record<string, PriceItem[]> = {};
    CATEGORIES.forEach((c) => (byCat[c] = []));
    prices.forEach((p) => {
      if (!byCat[p.category]) byCat[p.category] = [];
      byCat[p.category].push(p);
    });
    return byCat;
  }, [prices]);

  const validateAdd = () => {
    if (!newCategory) return "Оберіть категорію";

    const priceNum = Number(String(newPrice).replace(/[^\d]/g, ""));
    if (!Number.isFinite(priceNum) || priceNum <= 0) return "Ціна має бути додатним числом";

    if (newCategory !== "EMS-massage" && !newIsTrial) {
      const n = Number(newCount);
      if (!Number.isFinite(n) || n <= 0) return "Кількість має бути додатним числом";
    }

    if (newCategory === "EMS-massage" && !newCount.trim()) {
      return "Введіть назву масажу";
    }

    return null;
  };

  const handleAdd = async () => {
    const v = validateAdd();
    if (v) {
      setFormError(v);
      return;
    }
    setFormError(null);

    let name: string;
    if (newCategory === "EMS-massage") {
      name = newCount.trim();
    } else {
      name = newIsTrial
        ? buildTrainingName({ isTrial: true })
        : buildTrainingName({ count: Number(newCount) });
    }

    const price = formatPriceUAH(newPrice);

    await addPrice({ category: newCategory, name, price });

    setNewCategory("EMS");
    setNewIsTrial(false);
    setNewCount("1");
    setNewPrice("0");
  };

  const startEdit = (row: PriceItem) => {
    const parsed = parseCountFromName(row.name);
    setEditRows((s) => ({
      ...s,
      [row.id]: {
        id: row.id,
        category: row.category,
        rawName: row.category === "EMS-massage"
          ? row.name
          : parsed.isTrial
            ? "Пробне"
            : String(parsed.count ?? ""),
        rawPrice: row.price.replace(/[^\d]/g, ""),
        isTrial: parsed.isTrial,
      },
    }));
  };

  const cancelEdit = (id: number) => {
    setEditRows((s) => {
      const { [id]: _, ...rest } = s;
      return rest;
    });
  };

  const commitEdit = async (id: number) => {
    const r = editRows[id];
    if (!r) return;

    const priceNum = Number(r.rawPrice.replace(/[^\d]/g, ""));
    if (!Number.isFinite(priceNum) || priceNum <= 0) return;

    let name: string;
    if (r.category === "EMS-massage") {
      if (!r.rawName.trim()) return;
      name = r.rawName.trim(); 
    } else if (r.isTrial) {
      name = buildTrainingName({ isTrial: true });
    } else {
      const count = Number(r.rawName.replace(/[^\d]/g, ""));
      if (!Number.isFinite(count) || count <= 0) return;
      name = buildTrainingName({ count });
    }

    const price = formatPriceUAH(priceNum);

    await updatePrice(id, { category: r.category, name, price });
    cancelEdit(id);
  };

  return (
    <div className={styles.adminContainer}>
      <h2>Управління цінами</h2>

      <h3>Додати нову позицію</h3>
      <div className={styles.addForm}>
        <select
          className={styles.input}
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value as any)}
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        {newCategory === "EMS-massage" ? (
          <input
            type="text"
            className={styles.input}
            placeholder="Назва масажу"
            value={newCount}
            onChange={(e) => setNewCount(e.target.value)}
          />
        ) : (
          <>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={newIsTrial}
                onChange={(e) => setNewIsTrial(e.target.checked)}
              />
              Пробне
            </label>

            <input
              type="number"
              className={styles.input}
              placeholder="Кількість"
              value={newCount}
              onChange={(e) => setNewCount(e.target.value)}
              disabled={newIsTrial}
            />
          </>
        )}

        <input
          type="number"
          className={styles.input}
          placeholder="Ціна (число)"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
        />

        <button className={styles.btnPrimary} onClick={handleAdd}>
          Додати
        </button>

        {formError && <div className={styles.error}>{formError}</div>}
      </div>

      {loading && <div>Завантаження…</div>}
      {error && <div className={styles.error}>{error}</div>}

      {CATEGORIES.map((cat) => (
        <div key={cat} className={styles.priceGroup}>
          <h3>{cat}</h3>
          {grouped[cat] && grouped[cat].length > 0 ? (
            grouped[cat].map((row) => {
              const edit = editRows[row.id];
              return (
                <div key={row.id} className={`${styles.priceRow} ${edit ? styles.editing : ""}`}>
                  <div className={styles.rowContent}>
                    {/* CATEGORY */}
                    {edit ? (
                      <select
                        value={edit.category}
                        onChange={(e) =>
                          setEditRows((s) => ({
                            ...s,
                            [row.id]: { ...edit, category: e.target.value },
                          }))
                        }
                      >
                        {CATEGORIES.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div className={styles.textValue}>{row.category}</div>
                    )}

                    {/* NAME */}
                    {edit ? (
                      edit.category === "EMS-massage" ? (
                        <input
                          type="text"
                          placeholder="Назва масажу"
                          value={edit.rawName}
                          onChange={(e) =>
                            setEditRows((s) => ({
                              ...s,
                              [row.id]: { ...edit, rawName: e.target.value },
                            }))
                          }
                        />
                      ) : (
                        <div className={styles.nameBlock}>
                          <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <input
                              type="checkbox"
                              checked={edit.isTrial}
                              onChange={(e) =>
                                setEditRows((s) => ({
                                  ...s,
                                  [row.id]: { ...edit, isTrial: e.target.checked },
                                }))
                              }
                            />
                            Пробне
                          </label>
                          <input
                            type="number"
                            placeholder="Кількість"
                            disabled={edit.isTrial}
                            value={edit.isTrial ? "" : edit.rawName}
                            onChange={(e) =>
                              setEditRows((s) => ({
                                ...s,
                                [row.id]: { ...edit, rawName: e.target.value },
                              }))
                            }
                          />
                        </div>
                      )
                    ) : (
                      <div className={styles.textValue}>{row.name}</div>
                    )}

                    {/* PRICE */}
                    {edit ? (
                      <input
                        type="number"
                        placeholder="Ціна (число)"
                        value={edit.rawPrice}
                        onChange={(e) =>
                          setEditRows((s) => ({
                            ...s,
                            [row.id]: { ...edit, rawPrice: e.target.value },
                          }))
                        }
                      />
                    ) : (
                      <div className={styles.textValue}>{row.price}</div>
                    )}
                  </div>

                  {/* ACTIONS */}
                  <div className={styles.rowActions}>
                    {edit ? (
                      <>
                        <button onClick={() => commitEdit(row.id)}>Зберегти</button>
                        <button onClick={() => cancelEdit(row.id)}>Скасувати</button>
                      </>
                    ) : (
                      <>
                        <button onClick={() => deletePrice(row.id)}>Видалити</button>
                        <button onClick={() => startEdit(row)}>Редагувати</button>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className={styles.noData}>Немає позицій</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PricesAdmin;
