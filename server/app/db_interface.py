from app import models
from django.db.models.fields.files import ImageFieldFile
import json
import pprint
import datetime
pp = pprint.PrettyPrinter().pprint


def to_dict(model, fields: list):
    """
    fields = [
        ('actual_key', 'newKey'),
    ]
    """
    model = model.__dict__

    if '_state' in model.keys():
        model.pop('_state')
    if 'hash' in model.keys():
        model.pop('hash')

    if fields is None:
        return model
    else:
        new_model = {}
        for field in fields:
            attr = model[field[0]]
            if type(attr) in [datetime.date]:
                attr = attr.__str__()
            new_model[field[1]] = attr

        return new_model


def _select_from_query(query, fields):
    if fields is not None and len(fields) == 1:
        field = fields[0]
        for obj in query:
            attr = obj.__getattribute__(field[0])
            if type(attr) in [ImageFieldFile, datetime.date]:
                yield attr.__str__()
            else:
                yield attr
    else:
        for obj in query:
            yield to_dict(obj, fields)


def select(model, key, value, fields: list = None):
    """
    fields = [
        ('actual_key', 'newKey'),
    ]
    """
    query = model.objects.filter(**{key: value})
    return _select_from_query(query, fields)


def select_single(
        model,
        key,
        value,
        fields: list = None
):
    """
    fields = [
        ('actual_key', 'newKey'),
    ]
    """
    try:
        object = model.objects.get(**{key: value})
        object = to_dict(object, fields)
    except model.DoesNotExist:
        object = None

    return object
