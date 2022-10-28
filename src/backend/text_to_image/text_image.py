from __future__ import annotations

import math
from functools import cached_property
from typing import Iterable, SupportsIndex, Generator


class TextImage:
    DEFAULT_ENCODING = "utf-8"

    data: bytes

    def __init__(
        self,
        data: Iterable[int] | bytes | Iterable[SupportsIndex],
        encoding: str = DEFAULT_ENCODING,
    ):
        self.data = bytes(data)
        if not self.data:
            raise ValueError("Data for image is not provided")
        self._encoding = encoding

    @cached_property
    def size(self) -> tuple[int, int]:
        side_size = math.ceil(math.sqrt(math.ceil(len(self.data) / 3)))
        return side_size, side_size

    @cached_property
    def text(self) -> str:
        return self.data.decode(self._encoding)

    @classmethod
    def from_text(cls, text: str, encoding: str = DEFAULT_ENCODING) -> TextImage:
        return cls(text.encode(encoding=encoding), encoding)

    @property
    def pixels(self) -> Generator[tuple[int, int, int], None, None]:
        it = iter(self.data)
        first, second, third = None, None, None
        while True:
            try:
                first = next(it)
                second = next(it)
                third = next(it)
                yield first, second, third
                first, second, third = None, None, None
            except StopIteration:
                # incorrect data-pixel alignment
                if first is not None:
                    yield first, (second or 0), (third or 0)
                break
