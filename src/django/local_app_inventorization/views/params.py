from dataclasses import dataclass


@dataclass
class SearchParams:
    query: str | None
    start: int
    end: int | None

    @classmethod
    def from_get_params(cls, get_params):
        query = get_params.get('query', None)
        offset = get_params.get('offset', '0')
        start = int(offset) if offset.isnumeric() else 0
        limit = get_params.get('limit', '10')
        end = int(limit) + start if limit.isnumeric() else None

        return cls(
            query=query,
            start=start,
            end=end,
        )
