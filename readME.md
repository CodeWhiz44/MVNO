# Telgea <-> New MVNO Integration – Architecture & Approach

## Goals

-   Translate heterogeneous MVNO APIs (SOAP & REST) into Telgea’s **internal normalized format**.
-   Ensure testability, observability, clear separation-of-concerns, and future MVNO plug-in capability.

## Key Decisions

| Topic               | Decision                                                | Rationale                                        |
| ------------------- | ------------------------------------------------------- | ------------------------------------------------ |
| **Pattern**         | _Adapter + Normalizer_                                  | Decouple external schemas from core.             |
| **Transport**       | Node HTTP/HTTPS via Axios (REST) & `strong-soap` (SOAP) | Mature, TS typings available.                    |
| **Mapping**         | Pure functions in `/mappers`                            | No side-effects -> easier to test.               |
| **Validation**      | `zod` schemas at ingress/egress                         | Early failure, typed guarantees.                 |
| **Logging/Tracing** | `pino` + OpenTelemetry                                  | Structured JSON logs, distributed tracing ready. |
| **Testing**         | Jest + `nock`                                           | Fast, deterministic unit tests.                  |

## Flow (see diagram)

1. **MVNO Adapters** receive messages (push or poll).
2. Raw payloads → **Schemas/DTOs**.
3. **Mappers** transform into `InternalUsageRecord`.
4. Records published to **Telgea Normalizer API** (single responsibility).
5. **Observability** everywhere (trace-id propagates).

## Folder Layout (abridged)

```
├── readMe.md # Architecture & Approach
├── src
│ ├── adapters # inbound IO
│ │ ├── rest # empty
│ │ └── soap # empty
│ ├── mappers # pure data transforms
│ ├── models # TS types / zod schemas
│ ├── utils # logger, config, http client wrapper
│ └── index.ts # composition root
├── test # jest unit tests
└── package.json # scripts, dev-deps
```

### Quick Start

```bash
# 1. install
npm install

# 2. run tests
npm test           # jest green

# 3. run dev server
npm run dev        # starts Express on :4000
```
